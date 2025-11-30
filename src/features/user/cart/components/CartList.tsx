import {
  Box,
  Paper,
  Stack,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Divider,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router";
import { createCashOrder, getCheckoutSession } from "../api/orders.api";
import { showToast } from "@/utils/showToast";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  boxShadow:
    theme.palette.mode === "light"
      ? "0 2px 8px rgba(0,0,0,0.08)"
      : "0 2px 12px rgba(0,0,0,0.3)",
}));

export default function CartList() {
  const { cart, isLoading, deleteItem, updateItem, clearAllItems } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const theme = useTheme();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!cart || cart.cartItems.length === 0)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        textAlign="center"
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Looks like you haven’t added any items yet.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 4,
            py: 1.5,
            "&:hover": {
              bgcolor:
                theme.palette.mode === "light"
                  ? theme.palette.text.primary
                  : theme.palette.primary.main,
            },
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    );

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) return;
    setQuantities((prev) => ({ ...prev, [id]: value }));
    updateItem({ cartItemId: id, quantity: value });
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const totalPrice = cart.cartItems.reduce((sum, item) => {
    const qty = quantities[item.id] ?? item.quantity;
    return sum + item.price * qty;
  }, 0);

  // CASH PAYMENT
  const handleCashPayment = async () => {
    try {
      setCheckoutError(null);
      setCashLoading(true);

      const order = await createCashOrder(cart.id);

      // Clear cart silently, suppress toast
      await clearAllItems({ suppressToast: true });

      setCashLoading(false);
      setIsCheckoutOpen(false);

      showToast("Order placed successfully!", "success", theme);
      navigate(`/orders/${order.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.response?.data?.message || "Failed to create cash order.");
      setCashLoading(false);
    }
  };

  // ONLINE PAYMENT
  const handleOnlinePayment = async () => {
    try {
      setCheckoutError(null);
      setOnlineLoading(true);

      const session = await getCheckoutSession(cart.id);

      setOnlineLoading(false);
      setIsCheckoutOpen(false);

      if (session.url) {
        window.location.href = session.url;
      } else {
        setCheckoutError("No checkout URL returned from server.");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setCheckoutError(err.response?.data?.message || "Failed to initiate Stripe checkout.");
      setOnlineLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", py: 5, px: 2 }}>
      <Typography
        variant="h3"
        fontWeight={700}
        textAlign="center"
        mb={5}
        sx={{ color: theme.palette.text.primary }}
      >
        Your Shopping Cart
        <Typography variant="body1" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
          Review your selected items before proceeding to checkout
        </Typography>
      </Typography>

      {/* Cart Items */}
      <Stack spacing={2}>
        {cart.cartItems.map((item) => (
          <Item
            key={item.id}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "center" },
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            {/* Left: Image + Info */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "center" }}
              spacing={2}
              flex={1}
              width="100%"
            >
              <Box
                component="img"
                src={item.product.imageCoverUrl}
                alt={item.product.title}
                sx={{
                  width: { xs: 90, sm: 110 },
                  height: { xs: 90, sm: 110 },
                  borderRadius: 2,
                  objectFit: "cover",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 2px 6px rgba(0,0,0,0.1)"
                      : "0 2px 8px rgba(0,0,0,0.4)",
                }}
              />
              <Box textAlign={{ xs: "center", sm: "left" }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                >
                  {item.product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {formatCurrency(item.price)}
                </Typography>
              </Box>
            </Stack>

            {/* Quantity Controls */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1.5}
              sx={{ width: { xs: "100%", sm: "auto" }, mt: { xs: 2, sm: 0 } }}
            >
              <IconButton
                size="small"
                onClick={() =>
                  handleQuantityChange(item.id, (quantities[item.id] ?? item.quantity) - 1)
                }
                disabled={(quantities[item.id] ?? item.quantity) <= 1}
              >
                <Remove />
              </IconButton>

              <TextField
                type="number"
                size="small"
                value={quantities[item.id] ?? item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                inputProps={{
                  min: 1,
                  style: { textAlign: "center" },
                }}
                sx={{
                  width: 70,
                  "& input": {
                    textAlign: "center",
                    // Remove default number input arrows
                    "&::-webkit-outer-spin-button": { WebkitAppearance: "none", margin: 0 },
                    "&::-webkit-inner-spin-button": { WebkitAppearance: "none", margin: 0 },
                    "&[type=number]": { MozAppearance: "textfield" }, // Firefox
                  },
                }}
              />


              <IconButton
                size="small"
                onClick={() =>
                  handleQuantityChange(item.id, (quantities[item.id] ?? item.quantity) + 1)
                }
              >
                <Add />
              </IconButton>
            </Stack>

            {/* Delete */}
            <Stack
              alignItems={{ xs: "center", sm: "flex-end" }}
              justifyContent="center"
              sx={{ mt: { xs: 2, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
            >
              <IconButton color="error" onClick={() => handleDelete(item.id)}>
                <Delete />
              </IconButton>
            </Stack>
          </Item>
        ))}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "center" }}
        spacing={3}
        mt={4}
      >
        {/* Clear Cart */}
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={() => clearAllItems({ suppressToast: false })}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 4,
            fontWeight: 600,
            borderWidth: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.error.main,
              color: "#fff",
              borderColor: theme.palette.error.main,
            },
          }}
        >
          Clear Cart
        </Button>

        {/* Total + Checkout */}
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h5" fontWeight={700}>
            Total: {formatCurrency(totalPrice)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setIsCheckoutOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 4,
              fontWeight: 600,
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? theme.palette.text.primary
                    : theme.palette.primary.main,
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Stack>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose how you'd like to pay for your order:
          </Typography>
          {checkoutError && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {checkoutError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "column", gap: 1, px: 3, pb: 2 }}>
          {/* Pay Online Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={onlineLoading}
            onClick={handleOnlinePayment}
          >
            {onlineLoading ? "Redirecting..." : "Pay Online (Stripe)"}
          </Button>
          {/* Pay Cash Button */}
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            disabled={cashLoading}
            onClick={handleCashPayment}
          >
            {cashLoading ? "Processing..." : "Pay Cash on Delivery"}
          </Button>
          {/* Cancel Button */}
          <Button onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
