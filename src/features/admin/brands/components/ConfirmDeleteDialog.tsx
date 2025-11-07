import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  loading?: boolean;
};

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  name,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Brand?</DialogTitle>
      <DialogContent>
        Are you sure you want to delete <b>{name}</b>?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
