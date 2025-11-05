// src/features/user/auth/components/GoogleLoginButton.tsx
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useGoogle } from "../hooks/useGoogle";

export default function GoogleLoginButton() {
  const { handleGoogleLogin, loading } = useGoogle();

  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<Google />}
      onClick={handleGoogleLogin}
      disabled={loading}
      sx={{
        textTransform: "none",
        fontWeight: 600,
        py: 1.3,
        borderRadius: 2,
      }}
    >
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  );
}
