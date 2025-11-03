import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function ForgotPassword() {
  const { form, onSubmit, isLoading, isSuccess, error } = useForgotPassword();
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
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>
        
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Enter your email and we'll send you a reset code
        </Typography>

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Reset code has been sent to your email!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : 'Send Reset Code'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Remember your password?{' '}
          <Link
            component={RouterLink}
            to={PUBLIC_ROUTES.LOGIN}
            underline="hover"
            fontWeight="bold"
          >
            Back to Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}