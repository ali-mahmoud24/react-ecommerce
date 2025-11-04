import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Link, Paper, Button, Alert, Grid } from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useResetPassword } from '../hooks/useResetPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react'; // Import useEffect
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const {
    form,
    onSubmit,
    verifyResetCode,
    isVerificationPending,
    isResetPending,
    isVerificationSuccess,
    verificationError,
    resetError,
  } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const [codeVerifiedLocally, setCodeVerifiedLocally] = useState(false);
  const email = watch('email');
  const resetCode = watch('resetCode');

  // Effect to automatically update local state when verification is successful from the hook
  useEffect(() => {
    if (isVerificationSuccess) {
      setCodeVerifiedLocally(true);
      toast.success('Reset code verified! You can now set your new password.');
    }
  }, [isVerificationSuccess]);

  const handleVerifyCode = async () => {
    if (!email || !resetCode) {
      // Manual error handling for fields not covered by onSubmit/schema for verify
      if (!email) form.setError('email', { type: 'manual', message: 'Email is required' });
      if (!resetCode)
        form.setError('resetCode', { type: 'manual', message: 'Reset code is required' });
      return;
    }
    verifyResetCode({ email, resetCode });
  };

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
          Reset Password
        </Typography>

        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Enter your email, reset code, and new password
        </Typography>

        {isVerificationSuccess && ( // Display success after verification
          <Alert severity="success" sx={{ mb: 3 }}>
            Code verified. Please set your new password.
          </Alert>
        )}

        {/* Display errors from verification or reset mutations */}
        {verificationError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {verificationError.message}
          </Alert>
        )}
        {resetError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {resetError.message}
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
            sx={{ mb: 2 }}
            disabled={codeVerifiedLocally || isVerificationPending || isResetPending} // Disable if verified or pending
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Reset Code"
                {...register('resetCode')}
                error={!!errors.resetCode}
                helperText={errors.resetCode?.message}
                disabled={codeVerifiedLocally || isVerificationPending || isResetPending} // Disable if verified or pending
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={handleVerifyCode}
                disabled={
                  !email ||
                  !resetCode ||
                  codeVerifiedLocally ||
                  isVerificationPending ||
                  isResetPending
                }
                sx={{ height: '56px', width: '100%' }}
              >
                {isVerificationPending ? <Spinner size="sm" /> : 'Verify'}
              </Button>
            </Grid>
          </Grid>

          {codeVerifiedLocally && ( // Only show password fields if code is verified
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={{ mb: 2 }}
                disabled={isResetPending}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={{ mb: 3 }}
                disabled={isResetPending}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={!codeVerifiedLocally || isResetPending} // Only enable submit after code verified
          >
            {isResetPending ? <Spinner size="sm" /> : 'Reset Password'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          <Link component={RouterLink} to={PUBLIC_ROUTES.LOGIN} underline="hover" fontWeight="bold">
            Back to Sign In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
