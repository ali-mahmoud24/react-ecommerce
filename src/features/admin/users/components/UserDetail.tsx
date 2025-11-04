import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
import PageContainer from './PageContainer';
import { useSnackbar } from 'notistack';
import { useUserByIdQuery, useDeleteUserMutation } from '../hooks/useUsers'; // adjust path if needed

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isLoading, isError, error } = useUserByIdQuery(id!);
  const deleteMutation = useDeleteUserMutation();

  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleBack = () => navigate('/admin/users');
  const handleEdit = () => navigate(`/admin/users/${id}/edit`);
  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = async () => {
    if (!id) return;
    try {
      await deleteMutation.mutateAsync(id);
      enqueueSnackbar('User deleted successfully.', { variant: 'success' });
      navigate('/admin/users');
    } catch (err) {
      enqueueSnackbar(`Failed to delete user: ${(err as Error).message}`, {
        variant: 'error',
      });
    } finally {
      setConfirmOpen(false);
    }
  };

  // Loading state
  if (isLoading)
    return (
      <PageContainer title="User Details">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );

  // Error state
  if (isError)
    return (
      <PageContainer title="User Details">
        <Alert severity="error">{(error as Error).message}</Alert>
      </PageContainer>
    );

  if (!user) return null;

  return (
    <PageContainer
      title={`${user.firstName}`}
      breadcrumbs={[{ title: 'Users', path: '/admin/users' }, { title: user.fullName }]}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Full Name</Typography>
              <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Email</Typography>
              <Typography>{user.email}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Role</Typography>
              <Typography>{user.role}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="overline">Created At</Typography>
              <Typography>{dayjs(user.createdAt).format('MMMM D, YYYY')}</Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="overline">Profile Image</Typography>
              <Box
                component="img"
                src={user.profileImageUrl || '/default-avatar.png'}
                alt={`${user.fullName} profile`}
                sx={{
                  mt: 1,
                  width: 150,
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '2px solid #ccc',
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" justifyContent="space-between">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete User?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{user.fullName}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
}
