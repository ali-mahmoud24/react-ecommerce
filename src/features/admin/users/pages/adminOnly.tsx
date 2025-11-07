import { Box, Typography, Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

export default function AdminOnly() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 5,
          borderRadius: 4,
          boxShadow: 3,
          width: '100%',
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Unauthorized Access
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          You don’t have permission to view this page. Please log in with an authorized account or
          go back to a safe page.
        </Typography>
        
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
