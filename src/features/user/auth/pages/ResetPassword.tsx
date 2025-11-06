import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  useTheme,
  Alert,
} from '@mui/material';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/Spinner';
import { useResetPassword } from '../hooks/useResetPassword';
import { authAPI } from '../api/auth.api';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { form, onSubmit, isLoading, isError, error } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  // Prefill email and resetCode from navigation state
  if (state?.email) setValue('email', state.email);
  if (state?.resetCode) setValue('resetCode', state.resetCode);

  const textFieldSx = {
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
  };

  const handleSubmitForm = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      toast.success('Password reset successful! Logging you in...');
      try {
        await authAPI.login({ email: data.email, password: data.newPassword });
        navigate(PUBLIC_ROUTES.HOME);
      } catch (loginError) {
        toast.error((loginError as Error).message || 'Login failed');
      }
    } else {
      toast.error(error?.message || 'Something went wrong');
    }
  };

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
          maxWidth: 420,
          p: { xs: 4, sm: 5 },
          borderRadius: 0.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 1 }}>
          Reset Password
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          Enter your new password below.
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
            disabled
            sx={textFieldSx}
          />

          <TextField
            label="Reset Code"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.resetCode}
            helperText={errors.resetCode?.message}
            {...register('resetCode')}
            disabled
            sx={textFieldSx}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            {...register('newPassword')}
            sx={textFieldSx}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
            {...register('passwordConfirm')}
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
              borderRadius: 0.25,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            {isLoading ? <Spinner size="sm" /> : 'Reset Password'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
