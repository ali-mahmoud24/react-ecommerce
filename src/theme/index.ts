import {
  createTheme,
  responsiveFontSizes,
  type ThemeOptions,
} from '@mui/material/styles';

const commonSettings: ThemeOptions = {
  shape: {
    borderRadius: 30,
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          },
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
      main: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F3F4F6',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F3F4F6',
    },
    text: {
      primary: '#000000',
      secondary: '#4B5563',
    },
    divider: '#E5E7EB',
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
      main: '#FFFFFF',
      contrastText: '#000000',
    },
    secondary: {
      main: '#F3F4F6',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#F3F4F6',
      secondary: '#D1D5DB',
    },
    divider: '#2D333B',
  },
};

// ======================
// EXPORT FINAL THEMES
// ======================
export const lightTheme = responsiveFontSizes(createTheme(lightThemeOptions));
export const darkTheme = responsiveFontSizes(createTheme(darkThemeOptions));
