import { useEffect, useState, type ChangeEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  Divider,
  Stack,
} from '@mui/material';
import Spinner from '@/components/ui/Spinner';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import ChangePasswordModal from '../components/ChangePasswordModal';

export default function Profile() {
  const { profile, isLoadingProfile, onSubmit, isUpdating, deactivateAccount, isDeactivating } =
    useProfile();
  const { user } = useAuth();

  const [formData, setFormData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const updatedData: any = { ...formData };
    if (imageFile) updatedData.profileImage = imageFile;
    onSubmit(updatedData);
    setIsEditing(false);
  };

  const getInitials = () => {
    const f = formData?.firstName?.[0]?.toUpperCase() || '';
    const l = formData?.lastName?.[0]?.toUpperCase() || '';
    return f + l;
  };

  if (isLoadingProfile || !formData)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Spinner size="lg" />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 0.25,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={3} mb={3}>
          <Box position="relative">
            <Avatar
              alt={`${formData.firstName} ${formData.lastName}`}
              src={preview || formData.profileImageUrl || ''}
              variant="square"
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                bgcolor: 'primary.main',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {!formData.profileImageUrl && getInitials()}
            </Avatar>

            {isEditing && (
              <Button
                component="label"
                size="small"
                variant="outlined"
                sx={{ mt: 1, textTransform: 'none' }}
              >
                Change
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
            )}
          </Box>

          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold">
              {formData.firstName} {formData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <Button
            variant={isEditing ? 'outlined' : 'contained'}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Form */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0.25 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0.25 } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0.25 } }}
            />
          </Grid>
        </Grid>

        {isEditing && (
          <Box textAlign="right" mt={4}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isUpdating}
              sx={{ minWidth: 160 }}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        )}

        {/* Change Password Button */}
        <Box mt={3}>
          <Button variant="outlined" color="primary" onClick={() => setIsPasswordModalOpen(true)}>
            Change Password
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />

        {/* Danger Zone */}
        <Box mt={6} p={3} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 0.25 }}>
          <Typography variant="h6" fontWeight={700} color="error" gutterBottom>
            Danger Zone
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Deactivating your account will make your profile inactive. You can reactivate later by
            logging in again.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={deactivateAccount}
            disabled={isDeactivating}
          >
            {isDeactivating ? 'Deactivating...' : 'Deactivate Account'}
          </Button>
        </Box>
      </Paper>

      {/* Change Password Modal */}

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </Box>
  );
}
