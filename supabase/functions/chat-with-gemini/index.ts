
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, studentClass, subject, format } = await req.json();
    
    // Validate API key
    if (!GEMINI_API_KEY) {
      console.error("CRITICAL ERROR: Missing Gemini API key");
      throw new Error("Gemini API key is not configured. Please add the GEMINI_API_KEY secret in your Supabase project settings.");
    }

    console.log("Processing request with message:", message.substring(0, 50) + "...");
    console.log("Student class:", studentClass);
    console.log("Subject:", subject);
    console.log("Format:", format);
    
    // Test API key validity with a simple request
    try {
      console.log("Validating API key...");
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`);
      
      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        console.error("API Key validation failed:", JSON.stringify(errorData));
        
        if (testResponse.status === 400) {
          throw new Error("The Gemini API key appears to be invalid. Please provide a valid API key.");
        } else if (testResponse.status === 403) {
          throw new Error("The Gemini API key is not authorized for this operation or has been disabled.");
        } else {
          throw new Error(`Gemini API key validation failed with status ${testResponse.status}. Please update your API key.`);
        }
      }
      
      console.log("API key validation successful ✓");
    } catch (validationError) {
      console.error("API key validation error:", validationError);
      throw validationError;
    }

    // Construct appropriate system prompt based on student details
    let systemPrompt = `You are SGK14's AI Student Mentor, a friendly and patient educational assistant for students in classes 8-12 (MP Board & CBSE).
    
Your goal is to help students understand concepts clearly, solve problems, and develop a love for learning.

GUIDELINES:
- Give clear, accurate explanations at the appropriate level for ${studentClass || "high school"} students
- For ${subject || "academic"} questions, provide step-by-step explanations that build understanding
- Use simple language with relevant examples
- When appropriate, use a mix of Hindi and English (Hinglish) to explain complex concepts
- For mathematical or scientific problems, show your work clearly
- Provide accurate information and admit when you don't know something
- Be encouraging and motivational, focusing on growth mindset
- Keep responses concise but thorough, with good formatting for readability
- For career advice, provide balanced perspectives on different options
- For project help, guide students through the thinking process rather than doing the work for them

Remember that your primary goal is to educate and empower students, not just provide answers.`;

    // Format parameter handling
    if (format === "simplified") {
      systemPrompt += "\n\nIMPORTANT: Explain in very simple terms, as if to a younger student. Use shorter sentences and basic vocabulary.";
    }

    console.log("Making request to Gemini API...");

    // Construct the request to Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: message }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    console.log("Gemini API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error response:", errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: { message: "Failed to parse error response" }};
      }
      
      // Determine specific error types for better user feedback
      let errorMessage = "Failed to get response from Gemini API";
      
      if (response.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again later.";
      } else if (response.status === 400) {
        errorMessage = "Invalid request to Gemini API. Please check your input.";
      } else if (response.status === 401 || response.status === 403) {
        errorMessage = "Authentication failed with Gemini API. The API key is invalid or has expired.";
      } else if (response.status === 500) {
        errorMessage = "Gemini API server error. Please try again later.";
      } else if (errorData.error) {
        errorMessage = errorData.error.message || errorMessage;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Successfully received response from Gemini API ✓");
    
    // Check if the response has the expected structure
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
      console.error("Unexpected Gemini API response format:", JSON.stringify(data));
      throw new Error("Received an invalid response format from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text || "Sorry, I couldn't generate a response.";
    console.log("Successfully extracted text from Gemini API response");

    return new Response(JSON.stringify({ 
      response: generatedText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || "An unexpected error occurred. Please try again later." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
