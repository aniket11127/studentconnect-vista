
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEnrollment } from "@/hooks/useEnrollment";

interface ProtectedEnrolledRouteProps {
  children: React.ReactNode;
}

const ProtectedEnrolledRoute = ({ children }: ProtectedEnrolledRouteProps) => {
  const { user, loading } = useAuth();
  const { enrolled, isLoading } = useEnrollment();
  const location = useLocation();

  if (loading || isLoading) {
    return <div className="h-screen flex items-center justify-center">Checking access...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (!enrolled) {
    return <Navigate to="/enroll" replace />;
  }

  return <>{children}</>;
};

export default ProtectedEnrolledRoute;
