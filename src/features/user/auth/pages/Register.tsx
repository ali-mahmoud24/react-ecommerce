import { Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  Divider,
  useTheme,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRegister } from '../hooks/useRegister';
import { PUBLIC_ROUTES } from '@/constants/routes';
import { useThemeContext } from '@/theme/useThemeContext';

export default function Register() {
  const { form, onSubmit, registerWithGoogle, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const theme = useTheme();
  useThemeContext();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' },
        backgroundImage: 'url("/src/assets/images/auth-side.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 8 },
        overflow: 'hidden',
      }}
    >
      {/* ===== Overlay for better readability ===== */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          zIndex: 0,
        }}
      />

      {/* ===== Floating Form Card ===== */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0.5,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 8px 30px rgba(0,0,0,0.1)'
              : '0 8px 25px rgba(255,255,255,0.1)',
          p: { xs: 4, sm: 5 },
          mx: { xs: 0, md: 6 },
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          Create Your Account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          mb={4}
          sx={{ color: theme.palette.text.secondary }}
        >
          Join us today and start your journey!
        </Typography>

        {/* ===== Form ===== */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName', { required: 'First name is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName', { required: 'Last name is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword', {
              required: 'Please confirm your password',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          {/* ===== Submit ===== */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Account'}
          </Button>

          {/* ===== Divider ===== */}
          <Divider sx={{ my: 3, color: theme.palette.text.secondary }}>or</Divider>

          {/* ===== Google Auth ===== */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            onClick={registerWithGoogle}
            sx={{
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
              },
            }}
          >
            Continue with Google
          </Button>
        </Box>

        {/* ===== Footer ===== */}
        <Typography
          variant="body2"
          textAlign="center"
          mt={3}
          sx={{ color: theme.palette.text.secondary }}
        >
          Already have an account?{' '}
          <Box
            component={RouterLink}
            to={PUBLIC_ROUTES.LOGIN}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              textDecoration: 'none',
              '&:hover': { opacity: 0.8 },
            }}
          >
            Sign in
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
