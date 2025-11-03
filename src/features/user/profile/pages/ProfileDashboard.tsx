import { useState } from 'react';
import { Box, Grid, Paper, Typography, Avatar, Chip, Divider, Badge } from '@mui/material';
import {
  Person,
  LocationOn,
  Security,
  ShoppingCart,
  Favorite,
  Dashboard,
  Inventory,
  Star,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import AddressManager from '../components/AddressManager';
import SecuritySettings from '../components/SecuritySettings';
import OrderHistory from '../components/OrderHistory';
import Wishlist from '../components/Wishlist';
import DashboardOverview from '../components/DashboardOverview';
import ProductManagement from '../components/ProductManagement';
import ProfileForm from './ProfileForm';

export default function ProfileDashboard() {
  const { user, fullName, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const userTabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: <Dashboard /> },
    { id: 'profile', label: 'Profile Information', icon: <Person /> },
    { id: 'addresses', label: 'My Addresses', icon: <LocationOn /> },
    { id: 'orders', label: 'Order History', icon: <ShoppingCart /> },
    { id: 'wishlist', label: 'My Wishlist', icon: <Favorite /> },
    { id: 'security', label: 'Security', icon: <Security /> },
  ];

  const adminTabs = [
    ...userTabs,
    { id: 'products', label: 'Product Management', icon: <Inventory /> },
  ];

  const tabs = isAdmin ? adminTabs : userTabs;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileForm />;
      case 'addresses':
        return <AddressManager />;
      case 'security':
        return <SecuritySettings />;
      case 'orders':
        return <OrderHistory />;
      case 'wishlist':
        return <Wishlist />;
      case 'products':
        return <ProductManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: { xs: 2, md: 3 } }}>
      {/* Enhanced Header */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Chip
                label={isAdmin ? 'ADMIN' : 'USER'}
                color={isAdmin ? 'warning' : 'primary'}
                size="small"
                sx={{ height: 20, fontSize: '0.6rem' }}
              />
            }
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                border: '4px solid rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.2)',
              }}
              src={user?.profileImageUrl}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                {fullName?.charAt(0)}
              </Typography>
            </Avatar>
          </Badge>

          <Box sx={{ flex: 1, color: 'white' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, {fullName}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              {user?.email}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={`${user?.addresses?.length || 0} Addresses`}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                size="small"
              />
              <Chip
                label={`${user?.wishlist?.length || 0} Wishlist Items`}
                variant="outlined"
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                size="small"
              />
              {user?.createdAt && (
                <Chip
                  label={`Member since ${new Date(user.createdAt).getFullYear()}`}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
                  size="small"
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3,
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Enhanced Sidebar Navigation */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Dashboard sx={{ fontSize: 20 }} />
              Navigation
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {tabs.map((tab) => (
              <Box
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  cursor: 'pointer',
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: activeTab === tab.id ? 'primary.main' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: activeTab === tab.id ? 'primary.dark' : 'grey.50',
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Box sx={{ opacity: activeTab === tab.id ? 1 : 0.7 }}>{tab.icon}</Box>
                <Typography fontWeight={activeTab === tab.id ? 'bold' : 'normal'} fontSize="0.9rem">
                  {tab.label}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Enhanced Quick Stats */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Star sx={{ fontSize: 20, color: 'warning.main' }} />
              Quick Stats
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Addresses:
                </Typography>
                <Chip label={user?.addresses?.length || 0} size="small" color="primary" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Wishlist Items:
                </Typography>
                <Chip label={user?.wishlist?.length || 0} size="small" color="secondary" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Total Orders:
                </Typography>
                <Chip label="12" size="small" color="success" /> {/* You can fetch this from API */}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  Member Since:
                </Typography>
                <Typography fontWeight="bold" variant="body2">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={9}>
          {renderContent()}
        </Grid>
      </Grid>
    </Box>
  );
}
