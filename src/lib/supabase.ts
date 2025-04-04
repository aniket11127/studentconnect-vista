
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Create a Supabase client if environment variables are available
let supabaseClient;
if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client with minimum required methods for development
  supabaseClient = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
    }
  };
}

export const supabase = supabaseClient;

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
}

// Helper function to get current user
export async function getCurrentUser() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
