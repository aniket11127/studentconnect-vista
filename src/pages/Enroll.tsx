
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollment } from "@/hooks/useEnrollment";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Enroll = () => {
  const { user } = useAuth();
  const { enrolled, isLoading, refetch } = useEnrollment();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    setLoading(true);
    try {
      if (!user) {
        toast.error("You must be logged in");
        return;
      }
      // Insert enrollment row for this user
      const { error } = await supabase.from("enrollments").insert([
        { user_id: user.id }
      ]);
      if (error) throw error;
      toast.success("Enrollment successful! Welcome.");
      refetch();
      navigate("/dashboard");
    } catch (error: any) {
      if (
        error.message &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        toast.info("You are already enrolled.");
        refetch();
        navigate("/dashboard");
      } else {
        toast.error(error.message || "Enrollment failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Checking enrollment...</div>;
  }
  if (enrolled) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join SGK14</h2>
        <p className="mb-6">
          Enroll now to unlock our full education platform:<br />
          curriculum, code editor, AI Chat, and more!
        </p>
        <Button size="lg" onClick={handleEnroll} disabled={loading || !user}>
          {loading ? "Enrolling..." : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
};

export default Enroll;
