import { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { Add, Edit, Delete, Visibility, Image } from '@mui/icons-material';
import Spinner from '@/components/ui/Spinner';
import { useProducts } from '../hooks/useProducts';

export default function ProductManagement() {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, ...productData });
    } else {
      createProduct.mutate(productData);
    }
    setDialogOpen(false);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (quantity: number) => {
    if (quantity === 0) return 'error';
    if (quantity < 10) return 'warning';
    return 'success';
  };

  const getStatusText = (quantity: number) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Product Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your product inventory and listings
          </Typography>
        </Box>
        <Button startIcon={<Add />} variant="contained" size="large" onClick={handleAddProduct}>
          Add New Product
        </Button>
      </Box>

      {createProduct.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {createProduct.error?.message}
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Spinner size="lg" />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Sold</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 1,
                              backgroundColor: 'grey.100',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                            }}
                          >
                            {product.imageCoverUrl ? (
                              <img
                                src={product.imageCoverUrl}
                                alt={product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Image sx={{ color: 'grey.400' }} />
                            )}
                          </Box>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {product.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {product.slug}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={product.category?.name} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            ${product.price}
                          </Typography>
                          {product.priceAfterDiscount && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              ${product.priceAfterDiscount}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">{product.quantity}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" color="success.main">
                          {product.sold}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            {product.averageRating || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            ({product.numOfRatings})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusText(product.quantity)}
                          color={getStatusColor(product.quantity)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="info">
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this product?')) {
                                deleteProduct.mutate(product.id);
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        isLoading={createProduct.isPending || updateProduct.isPending}
      />
    </Paper>
  );
}

// Product Dialog Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductDialog({ open, onClose, onSave, product, isLoading }: any) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || '',
    priceAfterDiscount: product?.priceAfterDiscount || '',
    quantity: product?.quantity || '',
    category: product?.category?.id || '',
    brand: product?.brand?.id || '',
    colors: product?.colors?.join(', ') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      price: parseFloat(formData.price),
      priceAfterDiscount: formData.priceAfterDiscount
        ? parseFloat(formData.priceAfterDiscount)
        : undefined,
      quantity: parseInt(formData.quantity),
      colors: formData.colors
        .split(',')
        .map((color: string) => color.trim())
        .filter(Boolean),
    };
    onSave(submitData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="product-url-slug"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                inputProps={{ min: '0.01', step: '0.01' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Discounted Price"
                type="number"
                value={formData.priceAfterDiscount}
                onChange={(e) => setFormData({ ...formData, priceAfterDiscount: e.target.value })}
                inputProps={{ min: '0.01', step: '0.01' }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                inputProps={{ min: '1' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Category ID"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="Brand ID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Colors (comma separated)"
                value={formData.colors}
                onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                placeholder="Red, Blue, Green"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" /> : product ? 'Update Product' : 'Create Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
