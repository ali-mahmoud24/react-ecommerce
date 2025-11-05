// src/features/user/auth/pages/VerifyResetCode.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Paper, Button, useTheme, Alert } from '@mui/material';
import toast from 'react-hot-toast';
import Spinner from '@/components/ui/Spinner';
import { useVerifyResetCode } from '../hooks/useVerifyResetCode';
import { PUBLIC_ROUTES } from '@/constants/routes';

export default function VerifyResetCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { form, onSubmit, isLoading, isError, error } = useVerifyResetCode();
  const { register, handleSubmit, formState: { errors }, setValue } = form;

  // Prefill email if passed from previous page
  if (state?.email) setValue('email', state.email);

  const handleSubmitForm = async (data: any) => {
    const success = await onSubmit(data);
    if (success) {
      toast.success('Code verified! Enter a new password.');
      navigate(PUBLIC_ROUTES.RESET_PASSWORD, { state: { email: data.email, resetCode: data.resetCode } });
    } else {
      toast.error(error?.message || 'Invalid code');
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: theme.palette.background.default, px: 2 }}>
      <Paper elevation={6} sx={{ width: '100%', maxWidth: 420, p: { xs: 4, sm: 5 }, borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom sx={{ mb: 1 }}>Verify Reset Code</Typography>
        <Typography variant="body2" sx={{ mb: 4, color: theme.palette.text.secondary }}>Enter the 6-digit code sent to your email.</Typography>

        {isError && <Alert severity="error" sx={{ mb: 3 }}>{error?.message || 'Something went wrong'}</Alert>}

        <Box component="form" onSubmit={handleSubmit(handleSubmitForm)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            disabled
          />
          <TextField
            label="Reset Code"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.resetCode}
            helperText={errors.resetCode?.message}
            {...register('resetCode')}
          />

          <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading} sx={{ py: 1.3, borderRadius: 2, fontWeight: 600, textTransform: 'none' }}>
            {isLoading ? <Spinner size="sm" /> : 'Verify Code'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
