import { AppBar, Toolbar, IconButton, Stack, Tooltip, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ThemeSwitcher from './ThemeSwitcher';

interface Props {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export default function AdminHeader({ menuOpen, onToggleMenu }: Props) {
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
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mx: { xs: -0.75, sm: -1 } }}>
        {/* Left - Hamburger + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={menuOpen ? 'Collapse menu' : 'Expand menu'}>
            <IconButton onClick={onToggleMenu}>
              {menuOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>

          {/* Logo / Brand Text */}
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

        {/* Right - Theme Toggle */}
        <Stack direction="row" spacing={1}>
          <ThemeSwitcher />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
