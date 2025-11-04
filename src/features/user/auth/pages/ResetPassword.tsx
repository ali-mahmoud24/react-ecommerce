import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, TextField, Link, Paper, Button, Alert, Grid } from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useResetPassword } from '../hooks/useResetPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useState } from 'react';

export default function ResetPassword() {
  const { form, onSubmit, verifyResetCode, isLoading, isSuccess, error } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const [codeVerified, setCodeVerified] = useState(false);
  const email = watch('email');

  const handleVerifyCode = async () => {
    const resetCode = watch('resetCode');
    if (!email || !resetCode) return;

    try {
      await verifyResetCode(email, resetCode);
      setCodeVerified(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error handled in the mutation
    }
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

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Password reset successfully! Redirecting...
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
            sx={{ mb: 2 }}
            disabled={codeVerified}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Reset Code"
                {...register('resetCode')}
                error={!!errors.resetCode}
                helperText={errors.resetCode?.message}
                disabled={codeVerified}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                onClick={handleVerifyCode}
                disabled={!email || !watch('resetCode') || codeVerified}
                sx={{ height: '56px', width: '100%' }}
              >
                Verify
              </Button>
            </Grid>
          </Grid>

          {codeVerified && (
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                {...register('newPassword')}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
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
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading || !codeVerified}
          >
            {isLoading ? <Spinner size="sm" /> : 'Reset Password'}
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