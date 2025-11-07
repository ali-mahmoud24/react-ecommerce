import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ActivateAccountDialog({ open, onClose, onConfirm, isLoading }: Props) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle textAlign="center" sx={{ fontWeight: 700 }}>
        Reactivate Account
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          Your account is currently deactivated. Would you like to reactivate it?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} /> : undefined}
        >
          {isLoading ? 'Reactivating...' : 'Yes, Reactivate'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
