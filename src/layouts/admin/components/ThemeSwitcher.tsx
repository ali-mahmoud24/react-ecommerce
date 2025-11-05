import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '@/theme/useThemeContext';

export default function ThemeSwitcher() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}>
      <IconButton onClick={toggleTheme}>
        <LightModeIcon sx={{ display: mode === 'light' ? 'inline' : 'none' }} />
        <DarkModeIcon sx={{ display: mode === 'dark' ? 'inline' : 'none' }} />
      </IconButton>
    </Tooltip>
  );
}
