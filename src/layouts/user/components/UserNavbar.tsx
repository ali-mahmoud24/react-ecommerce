import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  useTheme,
  Badge,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useThemeContext } from '@/theme/useThemeContext';
import { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router';
// import logo from '@/assets/images/logo.jpg';
import { useCart } from '@/features/user/cart/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/features/user/auth/hooks/useLogout';
import { UserMenu } from './UserMenu';
import NavLinks from './NavLinks';
import SearchInput from './SearchInput';


function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Products', to: '/products' },
    { label: 'Categories', to: '/categories' },
    { label: 'Brands', to: '/brands' },
    ...(isAuthenticated ? [{ label: 'Wishlist', to: '/wishlist' }, { label: 'Cart', to: '/cart' }] : []),
  ];

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mb={2}>
        <IconButton onClick={handleDrawerToggle} size="small" sx={{ color: theme.palette.text.secondary }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <NavLinks links={navLinks} onClick={handleDrawerToggle} isMobile />
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 1, md: 0 },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 64,
            gap: { xs: 1, md: 3 },
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 1.2,
                fontFamily: "'Poppins', sans-serif",
                color: theme.palette.mode === 'light' ? '#000' : '#fff',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.85 },
              }}
            >
              Shoply
            </Typography>
          </Link>

          {/* Desktop nav + search */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 4,
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <NavLinks links={navLinks} />
            <Box sx={{ width: 300 }}>
              <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </Box>
          </Box>

          {/* Right actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1.5, md: 2 },
            }}
          >
            {isAuthenticated && (
              <IconButton
                color="inherit"
                onClick={() => navigate('/cart')}
                sx={{ p: { xs: 0.5, md: 1 } }}
              >
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon fontSize="medium" />
                </Badge>
              </IconButton>
            )}

            <IconButton
              onClick={toggleTheme}
              sx={{ p: { xs: 0.5, md: 1 } }}
            >
              {mode === 'light' ? <DarkModeIcon fontSize="medium" /> : <LightModeIcon fontSize="medium" />}
            </IconButton>

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
                component={Link}
                to="/login"
                variant="outlined"
                startIcon={<AccountCircleIcon fontSize="small" />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Login
              </Button>
            )}

            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, p: { xs: 0.5, md: 1 } }}
            >
              <MenuIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile search centered */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            px: 2,
            py: 1,
          }}
        >
          <SearchInput value={searchTerm} onChange={setSearchTerm} />
        </Box>
      </AppBar>


      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} sx={{ '& .MuiDrawer-paper': { borderRadius: 0 } }}>
        {drawer}
      </Drawer>
    </>
  );
}

export default memo(Navbar);
