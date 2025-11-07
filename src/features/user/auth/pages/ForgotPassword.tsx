import { Link as RouterLink, useNavigate } from 'react-router';
import {
  Box,
  Typography,
  TextField,
  Link,
  Paper,
  Button,
  useTheme,
  Alert,
} from '@mui/material';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/Spinner';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function ForgotPassword() {
  const { form, onSubmit, isLoading, isError, error } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const theme = useTheme();
  const navigate = useNavigate();

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      transition: 'all 0.2s ease',
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  };

  const handleSubmitForm = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      toast.success('Reset code sent to your email!');
      navigate(PUBLIC_ROUTES.VERIFY_RESET_CODE, { state: { email: data.email } });
    } else {
      toast.error(error?.message || 'Something went wrong');
    }
  };

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
          borderRadius: 2,
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
          Enter your email address and we'll send you a password reset code.
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error?.message || 'Something went wrong'}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(handleSubmitForm)}
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
            disabled={isLoading}
            sx={textFieldSx}
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
            {isLoading ? <Spinner size="sm" /> : 'Send Reset Code'}
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
