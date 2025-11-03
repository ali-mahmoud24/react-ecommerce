import { Paper, Typography, TextField, Button, Grid, Alert, Box, Avatar } from '@mui/material';
import { Edit, CameraAlt } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useProfile } from '../hooks/useProfile';

export default function ProfileForm() {
  const { form, onSubmit, isLoading, error } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = form;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Profile Information
        </Typography>
        <Button
          startIcon={<Edit />}
          variant="outlined"
          onClick={() => reset()}
          disabled={!isDirty || isLoading}
        >
          Reset Changes
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Profile Picture Section */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80 }} src={form.watch('profileImage')}>
                {form.watch('firstName')?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Profile Picture
                </Typography>
                <Button variant="outlined" startIcon={<CameraAlt />} component="label">
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // Handle file upload logic here
                        console.log('File selected:', file);
                      }
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>

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

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              placeholder="+1 (555) 123-4567"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => reset()}
                disabled={!isDirty || isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isDirty || isLoading}
                sx={{ minWidth: 120 }}
              >
                {isLoading ? <Spinner size="sm" /> : 'Save Changes'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
