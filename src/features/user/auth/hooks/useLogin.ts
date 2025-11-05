// src/features/user/auth/hooks/useLogin.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth(); // from AuthContext
  const queryClient = useQueryClient();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormData) => authAPI.login(values),
    onSuccess: async ({ data }) => {
      // 🔹 set user in context
      login(data);

      // 🔹 show toast
      toast.success(`Welcome back, ${data.firstName}!`);

      // 🔹 refresh user cache
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      // 🔹 redirect to homepage or dashboard
      navigate("/");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
    },
  });

  const onSubmit = (values: LoginFormData) => loginMutation.mutate(values);

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
