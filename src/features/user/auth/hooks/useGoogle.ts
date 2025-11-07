// src/hooks/useGoogle.ts
import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { authAPI } from "@/features/user/auth/api/auth.api";
import { useAuth } from "@/hooks/useAuth";

export function useGoogle() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const { mutate: fetchProfile } = useMutation({
    mutationFn: authAPI.me,
    onSuccess: (data) => {
      login(data);
      toast.dismiss();
      toast.success(`Welcome back, ${data.firstName || "User"}!`);
      navigate("/");
    },
    onError: () => {
      toast.dismiss();
      toast.error("Google login failed. Please try again.");
    },
  });

  const handleGoogleLogin = useCallback(() => {
    window.location.href = "/api/v2/auth/google";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleSuccess = params.get("google_success");
    const googleError = params.get("google_error");

    if (googleSuccess === "true") {
      setLoading(true);
      toast.loading("Signing you in with Google...");
      fetchProfile();
    } else if (googleError === "true") {
      toast.error("Google login was cancelled or failed.");
    }
  }, [location.search, fetchProfile]);

  return {
    handleGoogleLogin,
    loading,
  };
}
