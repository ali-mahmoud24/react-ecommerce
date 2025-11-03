import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Favorite, AddShoppingCart, Delete, Visibility } from '@mui/icons-material';
import { useWishlist } from '../hooks/useWishlist';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Favorite sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h5" fontWeight="bold">
          My Wishlist
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ ml: 2 }}>
          ({wishlistItems?.length || 0} items)
        </Typography>
      </Box>

      {wishlistItems && wishlistItems.length > 0 ? (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <Card elevation={2}>
                <CardContent>
                  <Box
                    sx={{
                      height: 140,
                      backgroundColor: 'grey.100',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <Typography color="textSecondary">No Image</Typography>
                    )}
                  </Box>
                  <Typography variant="h6" gutterBottom noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {item.category}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ${item.price}
                  </Typography>
                  {item.inStock && (
                    <Typography variant="body2" color="success.main">
                      In Stock
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    startIcon={<AddShoppingCart />}
                    size="small"
                    onClick={() => moveToCart.mutate(item.id)}
                    disabled={!item.inStock}
                  >
                    Add to Cart
                  </Button>
                  <Box>
                    <IconButton size="small" color="info">
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromWishlist.mutate(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Favorite sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Your Wishlist is Empty
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Save items you love to your wishlist
            </Typography>
          </CardContent>
        </Card>
      )}
    </Paper>
  );
}
