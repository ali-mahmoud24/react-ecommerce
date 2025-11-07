import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeSwitcher from './ThemeSwitcher';
import { useLogout } from '@/features/user/auth/hooks/useLogout';

interface Props {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function AdminHeader({ menuOpen, onToggleMenu }: Props) {
  const logoutMutation = useLogout();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mx: { xs: -0.75, sm: -1 },
        }}
      >
        {/* Left - Hamburger + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={menuOpen ? 'Collapse menu' : 'Expand menu'}>
            <IconButton onClick={onToggleMenu}>
              {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>

          <Typography
            variant="h6"
            fontWeight={800}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #90caf9, #ce93d8)'
                  : 'linear-gradient(90deg, #1565c0, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Admin
          </Typography>
        </Box>

        {/* Right - Theme Toggle + Logout */}
        <Stack direction="row" spacing={1} alignItems="center">
          <ThemeSwitcher />

          <Tooltip title="Logout">
            <IconButton
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <CircularProgress size={20} thickness={5} />
              ) : (
                <LogoutIcon color="error" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
