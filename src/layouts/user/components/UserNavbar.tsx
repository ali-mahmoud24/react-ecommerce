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
  Button,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useThemeContext } from '@/theme/useThemeContext';
import { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo.jpg';
import { useCart } from '@/features/user/cart/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/features/user/auth/hooks/useLogout';

// ---------------- Styled Search Components ----------------
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, 0.05)
      : alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? alpha(theme.palette.common.black, 0.1)
        : alpha(theme.palette.common.white, 0.15),
  },
  width: '100%',
  [theme.breakpoints.up('md')]: { width: '180px' },
  [theme.breakpoints.up('lg')]: { width: '500px' },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'light' ? theme.palette.text.secondary : theme.palette.grey[400],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

// ---------------- User Menu ----------------
const UserMenu = memo(({ user, anchorEl, onOpen, onClose, onLogout }: any) => {
  const theme = useTheme();

  const getInitials = () => {
    if (!user) return '?';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <>
      <IconButton onClick={onOpen}>
        <Avatar
          alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
          src={user?.profileImageUrl || ''}

          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: user?.avatar
              ? 'transparent'
              : theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.primary.light,
            color: user?.avatar
              ? 'inherit'
              : theme.palette.getContrastText(
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.main
                    : theme.palette.primary.light
                ),
            fontWeight: 600,
            fontSize: '1rem',
            border: `1px solid ${
              theme.palette.mode === 'light'
                ? alpha(theme.palette.text.primary, 0.1)
                : alpha(theme.palette.common.white, 0.2)
            }`,
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 1px 3px rgba(0,0,0,0.1)'
                : '0 1px 3px rgba(255,255,255,0.05)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0 2px 8px rgba(0,0,0,0.15)'
                  : '0 2px 8px rgba(255,255,255,0.1)',
            },
          }}
        >
          {!user?.avatar && getInitials()}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        PaperProps={{ sx: { borderRadius: 0.25, mt: 1, minWidth: 160 } }}
      >
        <MenuItem component={Link} to="/profile">
          <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem component={Link} to="/orders">
          <InventoryIcon fontSize="small" sx={{ mr: 1 }} /> Orders
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
});

// ---------------- Main Navbar ----------------
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleMenuOpen = useCallback((e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget), []);
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);
  const handleLogout = useCallback(() => {
    handleMenuClose();
    logout();
  }, [logout, handleMenuClose]);

  const navLinks = [
    { label: 'Products', to: '/products', active: true },
    { label: 'Categories', to: '/categories' },
    { label: 'Brands', to: '/brands' },
    { label: 'Wishlist', to: '/wishlist' },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
        <IconButton onClick={handleDrawerToggle} size="small" sx={{ color: theme.palette.text.secondary }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navLinks.map((link) => (
          <ListItemButton
            key={link.label}
            component={Link}
            to={link.to}
            selected={link.active}
            onClick={handleDrawerToggle}
            sx={{ borderRadius: '10px' }}
          >
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                color: link.active ? theme.palette.primary.main : theme.palette.text.primary,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Box mt={3}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search for products" inputProps={{ 'aria-label': 'search' }} />
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
          py: 0.5,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box display="flex" alignItems="center" gap={1}>
              <img src={logo} alt="Ecommerce Logo" style={{ width: 40, height: 40, borderRadius: 8 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
                Ecommerce
              </Typography>
            </Box>
          </Link>

          {/* Nav Links (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 3,
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                component={Link}
                to={link.to}
                sx={{
                  textDecoration: 'none',
                  color: link.active ? theme.palette.primary.main : theme.palette.text.primary,
                  fontWeight: link.active ? 600 : 500,
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          {/* Right Section */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Search */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Box>

            {/* Cart */}
            <IconButton color="inherit" onClick={() => navigate('/cart')} sx={{ ml: 1 }}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Theme Toggle */}
            <IconButton onClick={toggleTheme}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {/* Auth Section */}
            {isAuthenticated ? (
              <UserMenu
                user={user}
                anchorEl={anchorEl}
                onOpen={handleMenuOpen}
                onClose={handleMenuClose}
                onLogout={handleLogout}
              />
            ) : (
              <Button
                href="/login"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                sx={{ textTransform: 'none', fontWeight: 500, borderRadius: 0.25 }}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <IconButton onClick={handleDrawerToggle} sx={{ display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Mobile) */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}

export default memo(Navbar);
