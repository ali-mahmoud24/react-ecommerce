import { useState } from 'react';
import { useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
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

export default function ProductDetails() {
  const theme = useTheme();
  const { id } = useParams();
  const { data, isLoading } = useProduct();
  const product = data?.find((item: Product) => item.id === id);

  const images = [product?.imageCoverUrl, ...(product?.imageUrls || [])].filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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

  if (isLoading) {
    return (
      <Box p={4} display="flex" gap={8} justifyContent="center" alignItems="flex-start">
        <Skeleton variant="rectangular" width={500} height={450} sx={{ borderRadius: 2 }} />
        <Stack spacing={2} maxWidth={400}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" width="100%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Skeleton variant="rectangular" width="100%" height={50} sx={{ borderRadius: 2 }} />
        </Stack>
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
        {/* Main Image with Fade Effect */}
        <Box
          component="img"
          key={currentIndex}
          src={images[currentIndex]}
          alt={product.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // borderRadius: 3,
            boxShadow: 3,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Navigation Arrows */}
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
                borderRadius: 0,
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
                ? theme.palette.primary.light // Light color for dark mode
                : theme.palette.text.primary, // Normal dark color for light mode
          }}
        >
          ${product.price.toLocaleString()}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          {product.description || 'No description available.'}
        </Typography>

        <Button
          variant="contained"
          fullWidth
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
                  ? theme.palette.text.secondary
                  : theme.palette.primary.dark,
            },
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
}
