import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

import { useProduct } from '../hooks/useProducts';
import { useNavigate } from 'react-router';
import { useState, useMemo } from 'react';
import ProductFilter from '../components/ProductFilter';

export default function ProductList() {
  const theme = useTheme();
  const { data, isLoading } = useProduct();
  const navigate = useNavigate();

  const [priceFilter, setPriceFilter] = useState<number[]>([0, 100000]);
  const [rating, setRating] = useState<number>(0);

  const handleClick = (id: string) => navigate(`/product/${id}`);

  const handleReset = () => {
    setPriceFilter([0, 100000]);
    setRating(0);
  };

  const filteredProducts = useMemo(() => {
    return (
      data?.filter(
        (p) => p.price >= priceFilter[0] && p.price <= priceFilter[1] && p.numOfRatings >= rating,
      ) || []
    );
  }, [data, priceFilter, rating]);

  return (
    <Box
      display="flex"
      gap={4}
      p={4}
      bgcolor="#fafafa"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {/* ==== SIDEBAR ==== */}
      <ProductFilter
        priceFilter={priceFilter}
        onPriceChange={(_, newValue) => setPriceFilter(newValue as number[])}
        rating={rating}
        onRatingChange={(_, newValue) => setRating(newValue || 0)}
        onReset={handleReset}
      />

      {/* ==== PRODUCTS GRID ==== */}
      <Grid container spacing={3} justifyContent="flex-start" flex={1}>
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  sx={{
                    width: 230,
                    boxShadow: 2,
                    overflow: 'hidden',
                    // bgcolor: '#fff',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{
                      animation: 'pulse 1.2s ease-in-out infinite',
                      // bgcolor: theme.palette.background.default,
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center' ,bgcolor: theme.palette.background.default,}}>
                    <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                    <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2, mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : filteredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  onClick={() => handleClick(product.id)}
                  sx={{
                    cursor: 'pointer',
                    width: 250,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    color: theme.palette.text.primary,

                    // '&:hover': {
                    //   transform: 'translateY(-5px)',
                    //   boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                    // },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.imageCoverUrl}
                    alt={product.title}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      backgroundColor: '#f0f0f0',
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ mb: 0.5 }}>
                      {product.title}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                      <Rating
                        value={product.numOfRatings}
                        precision={0.5}
                        readOnly
                        size="small"
                        // sx={{ color: 'black' }}
                      />
                      <Typography variant="body2" ml={0.5} color="text.secondary">
                        {product.numOfRatings.toFixed(1)} / 5
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      mt={1}
                      color="black"
                      sx={{ textAlign: 'center', color: theme.palette.text.primary }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
