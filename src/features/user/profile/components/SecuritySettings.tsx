import { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  Box,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { Lock, Security, Password } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useSecurity } from '../hooks/useSecurity';

export default function SecuritySettings() {
  const { changePassword, deactivateAccount } = useSecurity();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    changePassword.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Security Settings
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
        Manage your password and account security
      </Typography>

      {/* Change Password */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Password sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight="bold">
              Change Password
            </Typography>
          </Box>

          {changePassword.isError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {changePassword.error?.message}
            </Alert>
          )}

          {changePassword.isSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password updated successfully!
            </Alert>
          )}

          <Box component="form" onSubmit={handlePasswordChange}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  required
                  helperText="Minimum 6 characters"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={changePassword.isPending}
                  sx={{ minWidth: 150 }}
                >
                  {changePassword.isPending ? <Spinner size="sm" /> : 'Update Password'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Account Security */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Security sx={{ mr: 2, color: 'warning.main' }} />
            <Typography variant="h6" fontWeight="bold">
              Account Security
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" color="info">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outlined" color="info">
              View Login Activity
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* Danger Zone */}
      <Card elevation={2} sx={{ border: '2px solid', borderColor: 'error.light' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Lock sx={{ mr: 2, color: 'error.main' }} />
            <Typography variant="h6" fontWeight="bold" color="error">
              Danger Zone
            </Typography>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Once you deactivate your account, you will lose access to all features and data. This
            action cannot be undone.
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to deactivate your account? This action cannot be undone.',
                )
              ) {
                deactivateAccount.mutate();
              }
            }}
            disabled={deactivateAccount.isPending}
          >
            {deactivateAccount.isPending ? <Spinner size="sm" /> : 'Deactivate Account'}
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
}
