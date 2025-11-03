import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Divider,
  Button,
  Alert,
  Grid,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useRegister } from '../hooks/useRegister';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function Register() {
  const { form, onSubmit, isLoading, error, registerWithGoogle } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Create Account
        </Typography>

        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Join us today and get started
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 3 }}
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : 'Create Account'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={registerWithGoogle}
          size="large"
        >
          Continue with Google
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link component={RouterLink} to={PUBLIC_ROUTES.LOGIN} underline="hover" fontWeight="bold">
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
