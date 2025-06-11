import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  } 

  try {
    const { message, studentClass, subject, format } = await req.json();

    console.log("Processing request with message:", message?.substring(0, 50) + "...");
    console.log("Student class:", studentClass);
    console.log("Subject:", subject);
    console.log("Format:", format);

    const nvidiaApiKey = Deno.env.get('NVIDIA_API_KEY');

    if (!nvidiaApiKey) {
      console.error("NVIDIA API key not found in environment variables");
      return new Response(
        JSON.stringify({ error: "NVIDIA API key not configured. Please contact support." }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log("Using NVIDIA API key:", nvidiaApiKey.substring(0, 10) + "...");

    // ✅ Step 1: Updated systemPrompt for better student experience
    let systemPrompt = `
You are SGK14's AI Mentor, designed to support school students from Class 8th to 12th.

Speak in simple Hinglish. Be friendly, like a helpful elder sibling.

Your goal is to:
- Motivate students to study and grow.
- Guide them in topics like programming, career, mental health, public speaking.
- Explain concepts with examples they can relate to (school, games, social life).

If asked doubts on studies, reply step-by-step.
If asked emotional/personal questions, be kind and caring.
If asked in general, still be helpful and uplifting.

Keep responses short, meaningful and student-friendly.
`;

    // ✅ Step 2: Add student-specific context
    if (studentClass && studentClass !== 'test') {
      systemPrompt += ` The student is in Class ${studentClass}.`;
    }

    if (subject && subject !== 'test') {
      systemPrompt += ` They are asking about ${subject}.`;
    }

    if (format === 'simplified') {
      systemPrompt += " Please provide a simplified explanation that is easy to understand, using simple language and breaking down complex concepts into smaller parts.";
    }

    systemPrompt += " Always be encouraging and supportive in your responses.";

    const requestBody = {
      model: "deepseek-ai/deepseek-r1",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.6,
      top_p: 0.7,
      max_tokens: 4096,
      stream: false
    };

    console.log("Making request to NVIDIA API...");

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${nvidiaApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("NVIDIA API request failed:", response.status, errorText);
      throw new Error(`NVIDIA API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("NVIDIA API response received successfully");

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid response structure from NVIDIA API:", data);
      throw new Error("Invalid response structure from NVIDIA API");
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error("Error in chat-with-nvidia function:", error);

    let errorMessage = "Sorry, I encountered an error while processing your request. Please try again later.";

    if (error.message && error.message.includes("API key")) {
      errorMessage = "There's an issue with the AI service configuration. Please contact support.";
    } else if (error.message && error.message.includes("rate limit")) {
      errorMessage = "We've reached our usage limit. Please try again in a few minutes.";
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
