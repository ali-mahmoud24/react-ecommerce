// src/features/user/auth/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { useAuth } from "@/hooks/useAuth";

export function useLogout() {
  const { logout } = useAuth();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout(),
    onSuccess: () => {
      logout();
      toast.success("Logged out successfully");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Logout failed";
      toast.error(message);
    },
  });

  return mutation;
}
