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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '@/theme/useThemeContext';
import { useState } from 'react';
import logo from '@/assets/images/logo.jpg';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
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
  [theme.breakpoints.up('md')]: {
    width: '500px',
  },
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const navLinks = [
    { label: 'Products', href: '/products', active: true },
    { label: 'Categories', href: '' },
    { label: 'Brands', href: '' },
    { label: 'Cart', href: '' },
    { label: 'Wishlist', href: '' },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      {/* Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
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
        {navLinks.map((link) => (
          <ListItemButton
            key={link.label}
            component="a"
            href={link.href}
            selected={link.active}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: '10px',
            }}
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

      {/* Mobile Search */}
      <Box sx={{ mt: 3 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for products..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={3}
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          padding: '0.25rem',
          borderRadius: 0,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={1}>
            <img src={logo} alt="Ecommerce Logo" style={{ width: '40px', height: '40px' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.5rem',
                color: theme.palette.text.primary,
              }}
            >
              Ecommerce
            </Typography>
          </Box>

          {/* Nav Links (Desktop view) */}
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
                component="a"
                href={link.href}
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

          {/* Search & Toggle & Mobile Menu */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Search (Desktop view) */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Search sx={{ display: { xs: 'none', md: 'block' }, width: 200 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>

            {/* Theme Toggle Button */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                ml: { xs: 0, md: 1 },
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            {/* Menu Button (Mobile view) */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
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
        sx={{ '& .MuiDrawer-paper': { borderRadius: 0 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
