import { useNavigate } from "react-router";
import { Box, Typography, Button, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function Landing() {
  const theme = useTheme();
  const navigate = useNavigate();

  const bgGradient = theme.palette.mode === "light"
    ? "linear-gradient(135deg, #ffffff 0%, #eef1ff 40%, #e5ebff 60%, #ffffff 100%)"
    : "linear-gradient(135deg, #000000 0%, #141722 40%, #1c2433 60%, #000000 100%)";

  const icons = [
    { icon: <ShoppingCartIcon fontSize="large" />, x: "18%", y: "22%", duration: 5 },
    { icon: <LocalShippingIcon fontSize="large" />, x: "58%", y: "38%", duration: 6 },
    { icon: <SellIcon fontSize="large" />, x: "38%", y: "62%", duration: 7 },
    { icon: <ShoppingBagIcon fontSize="large" />, x: "72%", y: "18%", duration: 5.5 },
    { icon: <CreditCardIcon fontSize="large" />, x: "48%", y: "78%", duration: 6.5 },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "90vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: bgGradient,
        m: 0,
        p: { xs: 3, md: 0 }, // Add padding on small screens
        mt: '-1rem', // compensate layout top padding
      }}
    >
      {/* LEFT TEXT */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        sx={{
          flex: 1,
          zIndex: 5,
          pl: { xs: 0, md: 10 }, // no left padding on small screens, add on md+
          textAlign: { xs: "center", md: "left" }, // center text on small screens
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            mb: 2,
            maxWidth: { xs: "100%", md: 600 },
            fontSize: { xs: "2.4rem", sm: "3rem", lg: "3.6rem" },
            lineHeight: { xs: "42px", sm: "50px" },
            mx: { xs: "auto", md: 0 }, // center horizontally on small screens
          }}
        >
          Your Favorite Products,
          <br /> All in One Place
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: { xs: "100%", md: 520 },
            mb: 5,
            fontSize: "1.1rem",
            mx: { xs: "auto", md: 0 }, // center horizontally on small screens
          }}
        >
          Shop electronics, lifestyle, home essentials, and more — with fast delivery and secure checkout.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/products")}
          component={motion.button}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          sx={{
            px: 8,
            py: 1.8,
            borderRadius: "14px",
            fontWeight: 700,
            display: "block",
            mx: { xs: "auto", md: "inherit" }, // center button on small screens
          }}
        >
          Start Shopping
        </Button>

        {/* STATS */}
        <Grid container spacing={4} sx={{ mt: 10, maxWidth: 550, mx: { xs: "auto", md: 0 } }}>
          {[
            { value: "500+", label: "Brands" },
            { value: "10,000+", label: "Products" },
            { value: "100,000+", label: "Customers" },
          ].map((item) => (
            <Grid key={item.label} size={{ xs: 12, sm: 4 }} >
              <Typography variant="h3" sx={{ fontWeight: 900, textAlign: { xs: "center", md: "left" } }}>
                {item.value}
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary, textAlign: { xs: "center", md: "left" } }}>
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* RIGHT PANEL — only visible on md+ */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3 }}
        sx={{
          flex: 1,
          height: "100vh",
          display: { xs: "none", md: "block" },
          position: "relative",
          clipPath: "path('M0,0 C60,160 140,160 240,0 L1000,0 L1000,1000 L0,1000 Z')",
          background: theme.palette.mode === "light"
            ? "linear-gradient(160deg, #e8ecff 0%, #f5f7ff 45%, #ffffff 85%)"
            : "linear-gradient(160deg, #12151d 0%, #181c27 50%, #1c212f 100%)",
        }}
      >
        {/* Floating Icons */}
        {icons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: item.duration, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y,
              fontSize: 40,
              opacity: 0.9,
              color: theme.palette.mode === "light" ? "#3f51b5" : "#90caf9",
              filter: theme.palette.mode === "light"
                ? "drop-shadow(0px 6px 16px rgba(0,0,0,0.18))"
                : "drop-shadow(0px 6px 16px rgba(255,255,255,0.15))",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
