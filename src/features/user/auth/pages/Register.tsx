// features/user/auth/pages/Register.tsx
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Divider,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useRegister } from '../hooks/useRegister';
import { PUBLIC_ROUTES } from '@/constants/routes';
import GoogleLoginButton from '../components/GoogleLoginButton';

export default function Register() {
  const { form, onSubmit, isLoading } = useRegister();
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
          borderRadius: 0.5,
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
          <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', padding: '25px', borderRadius: 0.5 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Join Our Community.
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Create your account and start exploring amazing features.
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
              Create your account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
              }}
            >
              Join us today and get started!
            </Typography>



            {/* ===== FORM ===== */}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="First Name"
                    fullWidth
                    {...register('firstName')}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    {...register('lastName')}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Grid>
              </Grid>

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register('passwordConfirm')}
                error={!!errors.passwordConfirm}
                helperText={errors.passwordConfirm?.message}
              />

              {/* ===== Submit Button ===== */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {isLoading ? <Spinner size="sm" /> : 'Create Account'}
              </Button>
            </Box>

            {/* ===== Divider ===== */}
            <Divider sx={{ my: 4, color: theme.palette.text.secondary }}>or</Divider>

            {/* ===== Google Register Button ===== */}
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
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to={PUBLIC_ROUTES.LOGIN}
                underline="hover"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
