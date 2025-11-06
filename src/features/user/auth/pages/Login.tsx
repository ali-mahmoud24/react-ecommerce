import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Link, useTheme, Paper, Divider, Button } from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useLogin } from '../hooks/useLogin';
import { PUBLIC_ROUTES } from '@/constants/routes';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function Login() {
  const { form, onSubmit, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const theme = useTheme();

  return (
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
          borderRadius: 0.25,
        }}
      >
        {/* ===== LEFT IMAGE SECTION ===== */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url("/src/assets/images/auth-login.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'flex-end',
            p: 5,
            color: 'white',
          }}
        >
          <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', padding: '25px', borderRadius: 0.25 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Welcome Back.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Manage your account and securely access your dashboard anytime.
            </Typography>
          </Box>
        </Box>

        {/* ===== RIGHT FORM SECTION ===== */}
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
            {/* ===== HEADER ===== */}
            <Typography variant="h5" textAlign="center" sx={{ fontWeight: 700, mb: 1 }}>
              Sign in to your account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
              }}
            >
              Welcome back! Please enter your credentials to continue.
            </Typography>

            {/* ===== FORM ===== */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0.25, // 🔹 rounded corners
                    transition: 'all 0.2s ease',
                    '&:hover eldset': {
                      borderColor: theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 0.25,
                    transition: 'all 0.2s ease',
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.light,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                }}
              />

              {/* ===== Forgot Password ===== */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link
                  component={RouterLink}
                  to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                  underline="hover"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    '&:hover': { opacity: 0.8 },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* ===== Submit Button ===== */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 0.25,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {isLoading ? <Spinner size="sm" /> : 'Sign in'}
              </Button>
            </Box>

            {/* ===== Divider ===== */}
            <Divider sx={{ my: 4, color: theme.palette.text.secondary }}>or</Divider>

            {/* ===== Google Login Button ===== */}
            <GoogleLoginButton />

            {/* ===== FOOTER ===== */}
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mt: 3,
                color: theme.palette.text.secondary,
              }}
            >
              Don&apos;t have an account?{' '}
              <Link
                component={RouterLink}
                to={PUBLIC_ROUTES.REGISTER}
                underline="hover"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
