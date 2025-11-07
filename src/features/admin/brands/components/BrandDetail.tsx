import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
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
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

import PageContainer from './PageContainer';
import ConfirmDialog from './ConfirmDeleteDialog';
import InfoCard from './InfoCard';
import { useBrandByIdQuery, useDeleteBrandMutation } from '../hooks/useBrands';

export default function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: brand, isLoading, isError, error } = useBrandByIdQuery(id!);
  const deleteMutation = useDeleteBrandMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    if (!id) return;
    setConfirmOpen(false);
    navigate('/admin/brands');

    deleteMutation.mutate(id, {
      onSuccess: () => {
        enqueueSnackbar('Brand deleted successfully', { variant: 'success' });
      },
      onError: (err) => {
        enqueueSnackbar(err.message || 'Failed to delete brand', { variant: 'error' });
      },
    });
  };

  if (isLoading)
    return (
      <PageContainer title="Brand Details">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );

  if (isError)
    return (
      <PageContainer title="Brand Details">
        <Alert severity="error">{(error as Error).message}</Alert>
      </PageContainer>
    );

  if (!brand) return null;

  return (
    <PageContainer
      title="Brand Details"
      breadcrumbs={[{ title: 'Brands', path: '/admin/brands' }, { title: brand.name }]}
    >
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <Stack alignItems="center" spacing={2}>
          <Avatar
            src={brand.imageUrl}
            alt={brand.name}
            sx={{
              width: 120,
              height: 120,
              borderRadius: 2,
              boxShadow: 3,
              border: '2px solid #e0e0e0',
            }}
          />

          <Typography variant="h5" fontWeight={700}>
            {brand.name}
          </Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCard label="Created At">
                <Typography sx={{ fontWeight: 500 }}>
                  {dayjs(brand.createdAt).format('MMM D, YYYY • h:mm A')}
                </Typography>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoCard label="Last Updated">
                <Typography sx={{ fontWeight: 500 }}>
                  {dayjs(brand.updatedAt).format('MMM D, YYYY • h:mm A')}
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
          onClick={() => navigate('/admin/brands')}
        >
          Back
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/admin/brands/${brand.id}/edit`)}
          >
            Edit
          </Button>

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
        name={brand.name}
        loading={deleteMutation.isPending}
      />
    </PageContainer>
  );
}
