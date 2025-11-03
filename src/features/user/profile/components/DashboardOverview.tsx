import {
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  LocationOn,
  Security,
  TrendingUp,
  Person,
  Inventory,
} from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { useWishlist } from '../hooks/useWishlist';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const { user, fullName, isAdmin } = useAuth();
  const { orders } = useOrders();
  const { wishlistItems } = useWishlist();

  const stats = [
    {
      title: 'Total Orders',
      value: orders?.length || 0,
      icon: <ShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary',
      progress: 75,
    },
    {
      title: 'Wishlist Items',
      value: wishlistItems?.length || 0,
      icon: <Favorite sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'secondary',
      progress: 60,
    },
    {
      title: 'Saved Addresses',
      value: user?.addresses?.length || 0,
      icon: <LocationOn sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success',
      progress: 40,
    },
    {
      title: 'Account Security',
      value: 'Protected',
      icon: <Security sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning',
      progress: 90,
    },
  ];

  const recentActivities = [
    { action: 'Order Placed', description: 'Order #12345 confirmed', time: '2 hours ago' },
    { action: 'Profile Updated', description: 'Updated personal information', time: '1 day ago' },
    { action: 'Address Added', description: 'New shipping address added', time: '2 days ago' },
    { action: 'Password Changed', description: 'Account password updated', time: '1 week ago' },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              Welcome back, {fullName}!
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              Here's what's happening with your account today.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" component={Link} to="/profile?tab=orders">
                View Orders
              </Button>
              <Button variant="outlined" component={Link} to="/profile?tab=profile">
                Edit Profile
              </Button>
              {isAdmin && (
                <Button
                  variant="outlined"
                  color="warning"
                  component={Link}
                  to="/profile?tab=products"
                >
                  Manage Products
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <TrendingUp sx={{ fontSize: 60, color: 'success.main', opacity: 0.7 }} />
            <Typography variant="body2" color="textSecondary">
              Account Activity
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2} sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold" color={`${stat.color}.main`}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}.light`,
                      borderRadius: 2,
                      p: 1,
                      opacity: 0.8,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  color={stat.color as any}
                  sx={{ height: 6, borderRadius: 3 }}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: 1, display: 'block' }}
                >
                  {stat.progress}% complete
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Person sx={{ color: 'primary.main' }} />
              Recent Activities
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentActivities.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    mb: 1,
                    backgroundColor: index === 0 ? 'primary.50' : 'transparent',
                    border: index === 0 ? '1px solid' : 'none',
                    borderColor: 'primary.200',
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? 'primary.main' : 'grey.400',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {activity.description}
                    </Typography>
                  </Box>
                  <Chip label={activity.time} size="small" variant="outlined" />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Inventory sx={{ color: 'warning.main' }} />
              Quick Actions
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined" fullWidth component={Link} to="/profile?tab=addresses">
                Add New Address
              </Button>
              <Button variant="outlined" fullWidth component={Link} to="/profile?tab=security">
                Change Password
              </Button>
              <Button variant="outlined" fullWidth component={Link} to="/profile?tab=wishlist">
                View Wishlist
              </Button>
              {isAdmin && (
                <Button
                  variant="contained"
                  fullWidth
                  color="warning"
                  component={Link}
                  to="/profile?tab=products"
                >
                  Add New Product
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
