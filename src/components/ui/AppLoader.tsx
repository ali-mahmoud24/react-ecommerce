import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

export default function AppLoader() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.secondary,
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
        }}
      />
      <Typography variant="body1" fontWeight={500}>
        Loading, please wait...
      </Typography>
    </Box>
  );
}
