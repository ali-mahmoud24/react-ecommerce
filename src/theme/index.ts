import {
  createTheme,
  responsiveFontSizes,
  type ThemeOptions,
} from '@mui/material/styles';

const commonSettings: ThemeOptions = {
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontSize: '2.2rem', fontWeight: 700 },
    h2: { fontSize: '1.8rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.9rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 2px 6px rgba(0,0,0,0.15)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
      },
    },
  },
};

// ======================
// LIGHT THEME
// ======================
const lightThemeOptions: ThemeOptions = {
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#003c8f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4b5563',
    },
    divider: '#e0e0e0',
  },
};

// ======================
// DARK THEME
// ======================
const darkThemeOptions: ThemeOptions = {
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#0d1117',
    },
    secondary: {
      main: '#ce93d8',
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: '#0d1117',
    },
    success: {
      main: '#81c784',
      dark: '#388e3c',
      light: '#c8e6c9',
      contrastText: '#0d1117',
    },
    error: {
      main: '#ef5350',
      light: '#e57373',
      dark: '#c62828',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#0d1117',
    },
    info: {
      main: '#64b5f6',
      light: '#90caf9',
      dark: '#1976d2',
      contrastText: '#0d1117',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#9da6b1',
    },
    divider: '#2d333b',
  },
};

// ======================
// EXPORT FINAL THEMES
// ======================
export const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));
export const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
