import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import type { Product } from '../api/products.api';
import { Box, Typography, Rating, Button, Skeleton } from '@mui/material';

export default function ProductDetails() {
  const { id } = useParams(); // Get product id from URL
  const { data, isLoading } = useProduct();

  const product = data?.find((item: Product) => item.id === id); // find the product

  if (isLoading) {
    return (
      <Box p={4} display="flex" gap={8} justifyContent="center" alignItems="flex-start">
        {/* Image Skeleton */}
        <Skeleton variant="rectangular" width={500} height={450} sx={{ borderRadius: 2 }} />

        {/* Text + Info Skeleton */}
        {/* <Stack spacing={2} maxWidth={400}>
          <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 2 }} />
        </Stack> */}
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" textAlign="center">
        Product not found
      </Typography>
    );
  }

  return (
    <Box p={4} display="flex" gap={8} justifyContent="center" alignItems="flex-start">
      <Box
        component="img"
        src={product.imageCoverUrl}
        alt={product.title}
        sx={{
          width: 500,
          height: 500,
          borderRadius: 2,
          boxShadow: 3,
          objectFit: 'cover',
          minWidth: 500,
        }}
      />
      <Box maxWidth={400}>
        <Typography
          sx={{
            fontSize: '4rem',
            lineHeight: 1,
            // width : 50,
            letterSpacing: 2,
            color: 'text.primary',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
          fontWeight="800"
        >
          {product.title}
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Rating
            value={product.numOfRatings || 0}
            readOnly
            precision={0.5}
            sx={{ color: 'black' }}
          />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {product.numOfRatings.toFixed(1)} / 5
          </Typography>
        </Box>
        <Typography variant="h3" color="black" mt={2} fontWeight="bold">
          ${product.price}
        </Typography>
        <Typography variant="body1" mt={2}>
          {product.description || 'No description available.'}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}
