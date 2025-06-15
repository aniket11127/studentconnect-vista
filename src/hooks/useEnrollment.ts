
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./useAuth";

/**
 * useEnrollment returns enrollment status for the current user.
 * Returns: { enrolled: boolean, isLoading: boolean }
 */
export function useEnrollment() {
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["enrollment", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data; // true if enrollment exists
    }
  });

  return {
    enrolled: !!data,
    isLoading,
    refetch
  };
}
