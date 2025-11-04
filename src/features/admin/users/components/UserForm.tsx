import { Box, Button, Grid, Stack, TextField, Avatar, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type UserFormData } from '../schema/user.schema';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

interface UserFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 'admin',
    },
  });

  const handleBack = () => navigate('/admin/users');

  const handleFormSubmit = async (data: UserFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'profileImage') {
        formData.append(key, value as string);
      }
    });

    // ✅ The profile image will now exist in `data.profileImage`
    if (data.profileImage && data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0]);
    }

    console.log('Form data object:', data);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    await onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      sx={{ width: '100%' }}
    >
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('passwordConfirm')}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
          />
        </Grid>

        {/* Image Upload + Preview */}
        <Grid size={{ xs: 12 }}>
          {preview && (
            <Stack direction="row" spacing={2} alignItems="center" my={2}>
              <Avatar
                src={preview}
                alt="Profile Preview"
                sx={{ width: 80, height: 80, borderRadius: '50%' }}
              />
              <Typography variant="body2" color="text.secondary">
                Preview
              </Typography>
            </Stack>
          )}
          <Stack direction="column" spacing={2} alignItems="flex-start">
            <Button variant="outlined" component="label" sx={{ alignSelf: 'flex-start' }}>
              Upload Profile Image
              <input
                type="file"
                hidden
                accept="image/*"
                {...register('profileImage', {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  },
                })}
              />
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ minWidth: 120 }}>
          {isSubmitting ? 'Saving...' : 'Create'}
        </Button>
      </Stack>
    </Box>
  );
}
