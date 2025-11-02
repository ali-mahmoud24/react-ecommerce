import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Skeleton,
  Typography,
} from '@mui/material';
import { useProduct } from '../hooks/useProducts';
import { useNavigate } from 'react-router';

export default function ProductList() {
  const { data, isLoading } = useProduct();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center" p={4}>
        {isLoading
          ? // 🦴 Skeleton Loader
            Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: 250,
                    borderRadius: 3,
                    boxShadow: 2,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Skeleton variant="text" width="80%" sx={{ mx: 'auto' }} />
                    <Skeleton variant="text" width="60%" sx={{ mx: 'auto' }} />
                    <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 2, mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : data?.map((product) => (
              <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  onClick={() => {
                    handleClick(product.id);
                  }}
                  sx={{
                    cursor: 'pointer',
                    width: 250,
                    boxShadow: 2,
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.03)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.imageCoverUrl}
                    alt={product.title}
                    sx={{
                      backgroundColor: '#f8f8f8',
                      height: 200,
                    }}
                  />

                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap>
                      {product.title}
                    </Typography>

                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                      <Rating value={product.numOfRatings} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" ml={0.5}>
                        {product.numOfRatings.toFixed(1)} / 5
                      </Typography>
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                      ${product.price}
                    </Typography>

                    <Button
                      variant="outlined"
                      // color="black"
                      fullWidth
                      sx={{
                        mt: 1,
                        borderRadius: 2,
                        color: 'white',
                        bgcolor: 'black',
                        '&:hover': {
                          bgcolor: 'white',
                          color: 'black',
                          borderColor: 'black',
                        },
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </>
  );
}
