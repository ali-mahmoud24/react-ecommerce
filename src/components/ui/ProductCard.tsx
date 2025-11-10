import { formatCurrency } from '@/utils/formatCurrency';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';
import { useCart } from '@/features/user/cart/hooks/useCart';
import { useWishlist } from '@/features/user/wishlist/hooks/useWishlist';

type ProductCardProps = {
  id: string;
  title: string;
  imageCoverUrl: string;
  numOfRatings: number;
  price: number;
  onClick: (id: string) => void;
};

export default function ProductCard({
  id,
  title,
  imageCoverUrl,
  numOfRatings,
  price,
  onClick,
}: ProductCardProps) {
  const theme = useTheme();
  const { addItemToCart } = useCart();
  const { addItemToWishlist } = useWishlist();

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.15)' },
      }}
    >
      <Box sx={{ overflow: 'hidden', height: 200, position: 'relative' }}>
        <CardMedia
          component="img"
          image={imageCoverUrl}
          alt={title}
          onClick={() => onClick(id)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#333',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        />

        {/* Wishlist on left, Cart on right */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
          {/* Wishlist Icon */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              addItemToWishlist(id);
            }}
            sx={{
              bgcolor: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
              color: theme.palette.getContrastText(
                theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main
              ),
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
              },
              boxShadow: 1,
            }}
          >
            <FavoriteBorder />
          </IconButton>

          {/* Cart Icon */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              addItemToCart(id);
            }}
            sx={{
              bgcolor: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
              color: theme.palette.getContrastText(
                theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main
              ),
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.primary.main,
              },
              boxShadow: 1,
            }}
          >
            <AddShoppingCart />
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ mb: 0.5 }}>
          {title}
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Rating value={numOfRatings} precision={0.5} readOnly size="small" />
          <Typography variant="body2" ml={0.5} color="text.secondary">
            {numOfRatings.toFixed(1)} / 5
          </Typography>
        </Box>

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mt={1}
          sx={{ textAlign: 'center', color: theme.palette.text.primary }}
        >
          {formatCurrency(price)}
        </Typography>
      </CardContent>
    </Card>
  );
}
