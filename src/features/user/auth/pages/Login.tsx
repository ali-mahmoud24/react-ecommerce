import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useLogin } from '../hooks/useLogin';
import { useActivateAccount } from '../hooks/useActivateAccount';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { Link as RouterLink } from 'react-router';

import loginImage from '@/assets/images/auth-login.jpg';

export default function Login() {
  const theme = useTheme();
  const { form, onSubmit, isLoading, isDeactivated, setIsDeactivated } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const { activateAccount, isActivating } = useActivateAccount({
    onSuccess: async () => {
      // Auto-login after successful reactivation
      if (credentials) await onSubmit(credentials);
      setIsDeactivated(false);
    },
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    setCredentials(values);
    try {
      await onSubmit(values);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.background.default,
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: '100%',
            maxWidth: 900,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {/* ==== Left Image Section ==== */}
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url(${loginImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'flex-end',
              p: 5,
              color: 'white',
            }}
          >
            <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', p: 3, borderRadius: 2 }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome Back
              </Typography>
              <Typography variant="body1">Access your account securely</Typography>
            </Box>
          </Box>

          {/* ==== Login Form Section ==== */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 4, sm: 6 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 380 }}>
              <Typography variant="h5" textAlign="center" fontWeight={700} mb={1}>
                Sign in
              </Typography>
              <Typography variant="body2" textAlign="center" color="text.secondary" mb={4}>
                Enter your email and password to continue.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit(handleLogin)}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
              >
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register('password')}
                />

                <Box textAlign="right">
                  <Link
                    component={RouterLink}
                    to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                    underline="hover"
                    color="primary"
                    fontWeight={600}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{ py: 1.2, borderRadius: 2, fontWeight: 600 }}
                >
                  {isLoading ? <Spinner size="sm" /> : 'Sign in'}
                </Button>
              </Box>

              <Divider sx={{ my: 4 }}>or</Divider>

              <GoogleLoginButton />

              <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
                Don’t have an account?{' '}
                <Link
                  component={RouterLink}
                  to={PUBLIC_ROUTES.REGISTER}
                  fontWeight={600}
                  color="primary"
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* ==== Account Reactivation Modal ==== */}
      <Dialog open={isDeactivated} onClose={() => setIsDeactivated(false)}>
        <DialogTitle>Account Deactivated</DialogTitle>
        <DialogContent>
          <Typography>
            Your account is currently deactivated. Would you like to reactivate it and log in again?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeactivated(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => credentials && activateAccount(credentials)}
            disabled={isActivating}
          >
            {isActivating ? <Spinner size="sm" /> : 'Reactivate & Login'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
