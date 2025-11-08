import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

import PageContainer from './PageContainer';
import UserAvatar from './UserAvatar';
import ConfirmDialog from './ConfirmDeleteDialog';
import InfoCard from './InfoCard';
import RoleBadge from './RoleBadge';

import { useUserByIdQuery, useDeleteUserMutation } from '../hooks/useUsers';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isLoading, isError, error } = useUserByIdQuery(id!);
  const deleteMutation = useDeleteUserMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    if (!id) return;

    setConfirmOpen(false); // close dialog immediately
    navigate('/admin/users'); // navigate immediately

    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(err.message || 'Failed to delete user', { variant: 'error' });
      },
    });
  };

  if (isLoading)
    return (
      <PageContainer title="User Details">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );

  if (isError)
    return (
      <PageContainer title="User Details">
        <Alert severity="error">{(error as Error).message}</Alert>
      </PageContainer>
    );

  if (!user) return null;

  return (
    <PageContainer
      breadcrumbs={[{ title: 'Users', path: '/admin/users' }, { title: user.fullName }]}
    >
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <Stack alignItems="center" spacing={2}>
          <UserAvatar name={user.fullName} src={user.profileImageUrl} />
          <Typography variant="h5" fontWeight={700}>
            {user.fullName}
          </Typography>
          <Typography color="text.secondary">{user.email}</Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCard label="Role">
                <RoleBadge role={user.role} />
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCard label="Created">
                <Typography sx={{ fontWeight: 500 }}>
                  {dayjs(user.createdAt).format('MMM D, YYYY • h:mm A')}
                </Typography>
              </InfoCard>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      {/* Action Buttons */}
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/users')}
        >
          Back
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmOpen(true)}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        name={user.fullName}
        loading={deleteMutation.isPending}
      />
    </PageContainer>
  );
}
