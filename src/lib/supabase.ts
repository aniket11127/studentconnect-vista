
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Export the supabase client
export const supabase = supabaseClient;

// Helper function to check if user is authenticated
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
}

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
