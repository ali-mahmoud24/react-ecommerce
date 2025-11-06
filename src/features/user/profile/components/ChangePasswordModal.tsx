import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useProfile } from '../hooks/useProfile';
import { changePasswordSchema, type ChangePasswordFormData } from '../schemas/profile.schema';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ open, onClose }: Props) {
  const { changePassword, isChangingPassword } = useProfile();

  const { register, handleSubmit, formState, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Old Password"
              type="password"
              {...register('oldPassword')}
              error={!!formState.errors.oldPassword}
              helperText={formState.errors.oldPassword?.message}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              {...register('newPassword')}
              error={!!formState.errors.newPassword}
              helperText={formState.errors.newPassword?.message}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              {...register('confirmPassword')}
              error={!!formState.errors.confirmPassword}
              helperText={formState.errors.confirmPassword?.message}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isChangingPassword}>
            {isChangingPassword ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
