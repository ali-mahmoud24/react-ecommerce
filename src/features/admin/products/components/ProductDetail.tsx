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
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';

import PageContainer from './PageContainer';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import InfoCard from './InfoCard';
import { useProductByIdQuery, useDeleteProductMutation } from '../hooks/useProducts';
import { useSnackbar } from 'notistack';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: product, isLoading, isError, error } = useProductByIdQuery(id!);
  const deleteMutation = useDeleteProductMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    if (!id) return;

    setConfirmOpen(false);
    navigate('/admin/products');

    deleteMutation.mutate(id, {
      onSuccess: () => enqueueSnackbar('Product deleted successfully', { variant: 'success' }),
      onError: (err: any) =>
        enqueueSnackbar(err.message || 'Failed to delete product', { variant: 'error' }),
    });
  };

  if (isLoading)
    return (
      <PageContainer title="Product Details">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </PageContainer>
    );

  if (isError)
    return (
      <PageContainer title="Product Details">
        <Alert severity="error">{(error as Error).message}</Alert>
      </PageContainer>
    );

  if (!product) return null;

  //  Combine the cover + imageUrls into a single array
  const allImages = [product.imageCoverUrl, ...(product.imageUrls || [])];

  return (
    <PageContainer
      breadcrumbs={[{ title: 'Products', path: '/admin/products' }, { title: product.title }]}
    >
      <Paper sx={{ p: 4, mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <Stack alignItems="center" spacing={2}>
          {/*  Display all 6 images at the top */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            {allImages.map(
              (url, i) =>
                url && (
                  <Box
                    key={i}
                    component="img"
                    src={url}
                    alt={`Product image ${i + 1}`}
                    sx={{
                      width: { xs: '45%', sm: 150, md: 160 },
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                )
            )}
          </Box>

          <Typography variant="h5" fontWeight={700}>
            {product.title}
          </Typography>
          <Typography color="text.secondary">
            {product.category?.name || 'Uncategorized'}
          </Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12} sm={6}>
              <InfoCard label="Price">
                <Typography sx={{ fontWeight: 500 }}>{product.price} EGP</Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoCard label="Quantity">
                <Typography sx={{ fontWeight: 500 }}>{product.quantity}</Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoCard label="Sold">
                <Typography sx={{ fontWeight: 500 }}>{product.sold}</Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoCard label="Brand">
                <Typography sx={{ fontWeight: 500 }}>
                  {product.brand?.name || 'Unbranded'}
                </Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InfoCard label="Created">
                <Typography sx={{ fontWeight: 500 }}>
                  {dayjs(product.createdAt).format('MMM D, YYYY')}
                </Typography>
              </InfoCard>
            </Grid>

            <Grid item xs={12}>
              <InfoCard label="Description">
                <Typography sx={{ whiteSpace: 'pre-line', fontWeight: 400 }}>
                  {product.description || 'No description provided.'}
                </Typography>
              </InfoCard>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      {/*  Action Buttons same as UserDetail */}
      <Stack direction="row" justifyContent="space-between">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/products')}
        >
          Back
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
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

      <ConfirmDeleteDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        name={product.title}
        loading={deleteMutation.isPending}
      />
    </PageContainer>
  );
}
