import { useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Alert, Avatar } from '@mui/material';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import Spinner from '@/components/ui/Spinner';
import { useLogout } from '@/features/user/auth/hooks/useLogout';

export default function Profile() {
  const { form, onSubmit, isLoading, profile, isLoadingProfile, error } = useProfile();
  const { user, fullName } = useAuth();
  const logoutMutation = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = form;

  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoadingProfile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Profile Settings
      </Typography>

      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Manage your personal information
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.message}
          </Alert>
        )}

        {/* Profile Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 3 }} src={user?.profileImageUrl}>
            {fullName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.role === 'admin' ? 'Administrator' : 'User'}
            </Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            Personal Information
          </Typography>

          <Grid container spacing={3}>
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

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? <Spinner size="sm" /> : 'Sign Out'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => reset()}
              disabled={!isDirty || isLoading}
            >
              Reset
            </Button>

            <Button type="submit" variant="contained" disabled={!isDirty || isLoading}>
              {isLoading ? <Spinner size="sm" /> : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
