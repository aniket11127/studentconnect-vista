
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
    
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured");
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

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to get response from Gemini API");
    }

    const generatedText = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ 
      response: generatedText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-gemini function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
