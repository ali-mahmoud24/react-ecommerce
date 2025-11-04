import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function ForgotPassword() {
  const { form, onSubmit, isLoading } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '80vh',
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
          maxWidth: 420,
          p: { xs: 4, sm: 5 },
          borderRadius: 0.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
          Forgot Password
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          Enter your email address and we'll send you a password reset link.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading}
            sx={{
              py: 1.3,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {isLoading ? <Spinner size="sm" /> : 'Send Reset Link'}
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: 3, color: theme.palette.text.secondary }}
        >
          Remember your password?{' '}
          <Link
            component={RouterLink}
            to={PUBLIC_ROUTES.LOGIN}
            underline="hover"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Back to Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}