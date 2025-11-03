import { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete, LocationOn, Home, Work } from '@mui/icons-material';
import { useAddress } from '../hooks/useAddress';

export default function AddressManager() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddress();
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingAddress, setEditingAddress] = useState<any>(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setDialogOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveAddress = (addressData: any) => {
    if (editingAddress) {
      updateAddress.mutate({ id: editingAddress.id, ...addressData });
    } else {
      addAddress.mutate(addressData);
    }
    setDialogOpen(false);
  };

  const getAddressIcon = (alias: string) => {
    switch (alias?.toLowerCase()) {
      case 'home':
        return <Home />;
      case 'work':
        return <Work />;
      default:
        return <Other />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Manage Addresses
        </Typography>
        <Button startIcon={<Add />} variant="contained" onClick={handleAddAddress}>
          Add New Address
        </Button>
      </Box>

      {addAddress.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {addAddress.error?.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {addresses?.map((address) => (
          <Grid size={{ xs: 12, sm: 6 }} key={address.id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getAddressIcon(address.alias)}
                  <Typography variant="h6" sx={{ ml: 1, flex: 1 }}>
                    {address.alias || 'Address'}
                  </Typography>
                  <Chip label="Default" size="small" color="primary" variant="outlined" />
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                  {address.street}, {address.building}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {address.city}, {address.country}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {address.apartment} • {address.postalCode}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📞 {address.phone}
                </Typography>
                {address.details && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1, fontStyle: 'italic' }}
                  >
                    {address.details}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => handleEditAddress(address)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => deleteAddress.mutate(address.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {(!addresses || addresses.length === 0) && (
          <Grid size={{ xs: 12 }}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <LocationOn sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No Addresses Added
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Add your first address to make shopping easier
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <AddressDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveAddress}
        address={editingAddress}
        isLoading={addAddress.isPending || updateAddress.isPending}
      />
    </Paper>
  );
}

// Address Dialog Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AddressDialog({ open, onClose, onSave, address, isLoading }: any) {
  const [formData, setFormData] = useState({
    alias: address?.alias || '',
    country: address?.country || '',
    city: address?.city || '',
    street: address?.street || '',
    building: address?.building || '',
    apartment: address?.apartment || '',
    details: address?.details || '',
    phone: address?.phone || '',
    postalCode: address?.postalCode || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{address ? 'Edit Address' : 'Add New Address'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address Alias"
                value={formData.alias}
                onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                placeholder="e.g., Home, Work"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Country"
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="City"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField
                fullWidth
                label="Street"
                required
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label="Building"
                required
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Apartment"
                required
                value={formData.apartment}
                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Additional Details"
                multiline
                rows={2}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Address'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
