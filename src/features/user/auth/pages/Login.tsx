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
} from '@mui/material';
import { Google } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useLogin } from '../hooks/useLogin';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function Login() {
  const { form, onSubmit, isLoading, error, loginWithGoogle } = useLogin();
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
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Welcome Back
        </Typography>
        
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Sign in to your account to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Link
              component={RouterLink}
              to={PUBLIC_ROUTES.FORGOTPASS}
              underline="hover"
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Sign In'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={loginWithGoogle}
          size="large"
        >
          Continue with Google
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to={PUBLIC_ROUTES.REGISTER}
            underline="hover"
            fontWeight="bold"
          >
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}