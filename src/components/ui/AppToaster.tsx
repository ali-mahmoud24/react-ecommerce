import { Toaster } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

export default function AppToaster() {
  const theme = useTheme();

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: '0.95rem',
          borderRadius: '8px',
          padding: '10px 16px',
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[3],
        },
        success: {
          iconTheme: {
            primary: theme.palette.success.main,
            secondary: theme.palette.background.paper,
          },
          style: {
            border: `1px solid ${theme.palette.success.main}`,
          },
          duration: 2500,
        },
        error: {
          iconTheme: {
            primary: theme.palette.error.main,
            secondary: theme.palette.background.paper,
          },
          style: {
            border: `1px solid ${theme.palette.error.main}`,
          },
          duration: 3500,
        },
      }}
    />
  );
}
