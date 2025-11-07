import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  alpha,
  useTheme,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useThemeContext } from "@/theme/useThemeContext";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import logo from "@/assets/images/logo.jpg";
import { useCart } from "@/features/user/cart/hooks/useCart";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor:
    theme.palette.mode === "light"
      ? alpha(theme.palette.common.black, 0.05)
      : alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.common.black, 0.1)
        : alpha(theme.palette.common.white, 0.15),
  },
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "180px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "500px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color:
    theme.palette.mode === "light"
      ? theme.palette.text.secondary
      : theme.palette.grey[400],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const navLinks = [
    { label: "Products", to: "/products" },
    { label: "Categories", to: "/categories" },
    { label: "Brands", to: "/brands" },
    { label: "Wishlist", to: "/wishlist" },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      {/* Close Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          size="small"
          sx={{ color: theme.palette.text.secondary }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav Links */}
      <List>
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.to);
          return (
            <ListItemButton
              key={link.label}
              component={Link}
              to={link.to}
              selected={isActive}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: "10px",
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                  fontWeight: isActive ? 600 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      {/* Mobile Search */}
      <Box sx={{ mt: 3 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for products"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          padding: "0.25rem",
          borderRadius: 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2 },
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src={logo}
                alt="Ecommerce Logo"
                style={{ width: "30px", height: "30px" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: theme.palette.text.primary,
                }}
              >
                Ecommerce
              </Typography>
            </Box>
          </Link>

          {/* Nav Links (Desktop view) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.to);
              return (
                <Typography
                  key={link.label}
                  component={Link}
                  to={link.to}
                  sx={{
                    textDecoration: "none",
                    color: isActive
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                    fontWeight: 600,
                    px: 0.875,
                    py: 1,
                    borderRadius: "8px",
                    backgroundColor: isActive
                      ? theme.palette.primary.main
                      : "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: isActive
                        ? theme.palette.primary.main
                        : alpha(theme.palette.primary.main, 0.1),
                      color: isActive
                        ? theme.palette.primary.contrastText
                        : theme.palette.primary.main,
                    },
                  }}
                >
                  {link.label}
                </Typography>
              );
            })}
          </Box>

          {/* Search & Toggle & Mobile Menu */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Search (Desktop view) */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products"
                  inputProps={{ "aria-label": "search" }}
                  sx={{ fontSize: "14px" }}
                />
              </Search>
            </Box>

            {/* Cart */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge
                badgeContent={totalItems}
                color="error"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Theme Toggle Button */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
              }}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {/* Menu Button (Mobile view) */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { md: "none" },
                color: theme.palette.text.secondary,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ "& .MuiDrawer-paper": { borderRadius: 0 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
