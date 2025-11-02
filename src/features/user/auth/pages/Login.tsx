import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  useTheme,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useLogin } from '../hooks/useLogin';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useThemeContext } from '@/theme/useThemeContext';

export default function Login() {
  const { form, onSubmit, isLoading, loginWithGoogle } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const theme = useTheme();
  useThemeContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {/* ===== LEFT IMAGE SECTION ===== */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          backgroundImage: 'url("/src/assets/images/auth-side.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 50,
            left: 50,
            color: 'white',
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Welcome Back
          </Typography>
          <Typography variant="body1" maxWidth={400}>
            Manage your account and access your dashboard securely.
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
          p: { xs: 3, sm: 6 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 4, sm: 5 },
            color: theme.palette.text.primary,
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Sign in to your account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mb: 4, color: theme.palette.text.secondary }}
          >
            Welcome back! Please enter your credentials.
          </Typography>

          {/* ========== FORM ========== */}
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
              {...register('email', { required: 'Email is required' })}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', { required: 'Password is required' })}
            />

            {/* ===== Forgot Password ===== */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                component={RouterLink}
                to={PUBLIC_ROUTES.FORGOTPASS}
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
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 2,
                fontWeight: 600,
              }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" className="text-white" /> : 'Sign in'}
            </Button>
          </Box>

          {/* ===== Divider ===== */}
          <Divider sx={{ my: 3, color: theme.palette.text.secondary }}>or</Divider>

          {/* ===== Google Login Button ===== */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={loginWithGoogle}
            sx={{
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light'
                    ? 'rgba(0,0,0,0.04)'
                    : 'rgba(255,255,255,0.08)',
              },
            }}
          >
            Continue with Google
          </Button>

          {/* ====== FOOTER ====== */}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              mt: 3,
              color: theme.palette.text.secondary,
            }}
          >
            Don’t have an account?{' '}
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
        </Paper>
      </Box>
    </Box>
  );
}
