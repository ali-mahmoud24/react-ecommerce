import { Link as RouterLink } from 'react-router-dom';
import { Email } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Link,
  useTheme,
  Paper,
  Button as MUIButton,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useThemeContext } from '@/theme/useThemeContext';

export default function ForgotPassword() {
  const { register, handleSubmit, onSubmit, errors, isLoading, success } = useForgotPassword();
  const theme = useTheme();
  useThemeContext();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 4, sm: 5 },
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {/* ===== Header ===== */}
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Forgot Password?
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mb: 4, color: theme.palette.text.secondary }}
        >
          Enter your email address below, and we’ll send you a link to reset your password.
        </Typography>

        {/* ===== Form ===== */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
            InputProps={{
              startAdornment: (
                <Email
                  sx={{ color: theme.palette.text.secondary, mr: 1 }}
                />
              ),
            }}
          />

          {/* ===== Submit Button ===== */}
          <MUIButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send Reset Link'
            )}
          </MUIButton>

          {/* ===== Success Message ===== */}
          {success && (
            <Typography
              color="success.main"
              textAlign="center"
              fontWeight={600}
              mt={1}
            >
              ✅ A reset link has been sent to your email!
            </Typography>
          )}
        </Box>

        {/* ===== Footer ===== */}
        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 3,
            color: theme.palette.text.secondary,
          }}
        >
          Remember your password?{' '}
          <Link
            component={RouterLink}
            to={PUBLIC_ROUTES.LOGIN}
            underline="hover"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
