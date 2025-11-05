import { Box, Typography } from '@mui/material';
import CartList from '../components/CartList';

export default function Cart() {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Your Shopping Cart 🛍️
      </Typography>
      <CartList />
    </Box>
  );
}
