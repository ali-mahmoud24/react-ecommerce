import { useState } from 'react';
import type { Product } from '../api/products.api';
import {
  Box,
  Typography,
  Rating,
  Button,
  Skeleton,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/features/user/cart/hooks/useCart';
import { useWishlist } from '../../wishlist/hooks/useWishlist';

interface ProductDetailsProps {
  product: Product | undefined;
  isLoading: boolean;
}

export default function ProductDetails({ product, isLoading }: ProductDetailsProps) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const { addItemToCart } = useCart();
  const { addItemToWishlist } = useWishlist();

  const images = [product?.imageCoverUrl, ...(product?.imageUrls || [])].filter(Boolean);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, 200);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setFade(true);
    }, 200);
  };

  // =======================
  // LOADING SKELETON STATE
  // =======================
  if (isLoading) {
    return (
      <Box
        p={4}
        display="flex"
        gap={8}
        justifyContent="center"
        alignItems="flex-start"
        flexWrap="wrap"
      >
        {/* ==== IMAGE SKELETON ==== */}
        <Box sx={{ width: 500 }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={500}
            sx={{ borderRadius: 2, mb: 2 }}
          />

          {/* Thumbnail skeletons */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                animation="wave"
                width={80}
                height={80}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Stack>
        </Box>

        {/* ==== INFO SKELETON ==== */}
        <Stack spacing={2} maxWidth={400} width="100%">
          <Skeleton variant="text" animation="wave" width="90%" height={40} />

          {/* Rating skeleton */}
          <Box display="flex" alignItems="center" gap={1}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="circular" animation="wave" width={20} height={20} />
            ))}
          </Box>

          <Skeleton variant="text" animation="wave" width="40%" height={35} />

          <Skeleton variant="text" animation="wave" width="90%" height={40} />

          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={50}
            sx={{ borderRadius: 2, mt: 2 }}
          />
        </Stack>
      </Box>
    );
  }

  // =======================
  // PRODUCT NOT FOUND STATE
  // =======================
  if (!product) {
    return (
      <Typography variant="h6" textAlign="center">
        Product not found
      </Typography>
    );
  }

  // =======================
  // PRODUCT DISPLAY STATE
  // =======================
  return (
    <Box
      p={4}
      display="flex"
      gap={8}
      justifyContent="center"
      alignItems="flex-start"
      flexWrap="wrap"
    >
      {/* ==== IMAGE SECTION ==== */}
      <Box sx={{ position: 'relative', width: 500, height: 500, mb: 4 }}>
        <Box
          component="img"
          key={currentIndex}
          src={images[currentIndex]}
          alt={product.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            boxShadow: 3,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 10,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <ArrowBackIosNew fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 10,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </>
        )}

        {/* Thumbnails */}
        <Stack direction="row" mt={2} justifyContent="space-between" flexWrap="nowrap">
          {images.map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img}
              alt={`${product.title}-${idx}`}
              onClick={() => setCurrentIndex(idx)}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                cursor: 'pointer',
                border: currentIndex === idx ? '3px solid black' : '1px solid #ddd',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  border: '2px solid #000',
                  transform: 'scale(1.05)',
                },
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* ==== INFO SECTION ==== */}
      <Box maxWidth={400}>
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: '800',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
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

        <Typography
          variant="h4"
          fontWeight="bold"
          mt={2}
          mb={2}
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.primary.light
                : theme.palette.text.primary,
          }}
        >
          {formatCurrency(product.price)}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          {product.description || 'No description available.'}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => addItemToCart(product.id)}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            ),
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'light'
                  ? theme.palette.text.primary
                  : theme.palette.primary.main,
            },
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => addItemToWishlist(product.id)}
          sx={{
            py: 1.5,
            my: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            color: theme.palette.getContrastText(
              theme.palette.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            ),
            '&:hover': {
              bgcolor:
                theme.palette.mode === 'light'
                  ? theme.palette.text.primary
                  : theme.palette.primary.main,
            },
          }}
        >
          Add to Wishlist
        </Button>
      </Box>
    </Box>
  );
}
