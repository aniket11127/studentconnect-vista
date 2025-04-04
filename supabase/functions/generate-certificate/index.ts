
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Get authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: 'No authorization header' }),
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Create a Supabase client with the auth header
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Get user from auth header
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get request body
    const { courseId, sessionTitle, expertName } = await req.json()
    
    if (!courseId || !sessionTitle || !expertName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate a course prefix from the courseId (first 2 chars)
    const coursePrefix = courseId.substring(0, 2).toUpperCase();

    // Call the generate_certificate_id function
    const { data: certificateIdData, error: certificateIdError } = await supabase
      .rpc('generate_certificate_id', { course_prefix: coursePrefix });

    if (certificateIdError) {
      throw certificateIdError;
    }

    // Insert the certificate
    const { data, error } = await supabase
      .from('certificates')
      .insert({
        user_id: user.id,
        course_id: courseId,
        session_title: sessionTitle,
        expert_name: expertName,
        certificate_id: certificateIdData,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, certificate: data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      }
    );
  } catch (error) {
    console.error('Error generating certificate:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})
