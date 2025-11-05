import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Sidebar state
  const [open, setOpen] = useState(isDesktop);

  useEffect(() => {
    // Auto control sidebar based on screen size
    if (isDesktop) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isDesktop]);

  const handleToggleMenu = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Header */}
      <AdminHeader menuOpen={open} onToggleMenu={handleToggleMenu} />

      {/* Sidebar */}
      <AdminSidebar open={open} onToggleMenu={handleToggleMenu} isDesktop={isDesktop} />
      {/* Main Page Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AppBar offset */}
        <Toolbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
            bgcolor: theme.palette.background.default,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
