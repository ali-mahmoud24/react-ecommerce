import { Link, useLocation } from 'react-router';
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const drawerWidth = 240;
const collapsedWidth = 64;

interface Props {
  open: boolean;
  onToggleMenu: () => void;
  isDesktop: boolean;
}

export default function AdminSidebar({ open, onToggleMenu, isDesktop }: Props) {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { label: 'Brands', icon: <LocalOfferIcon />, path: '/admin/brands' },
    { label: 'Categories', icon: <CategoryIcon />, path: '/admin/categories' },
    { label: 'Products', icon: <StoreIcon />, path: '/admin/products' },
    // { label: 'Orders', icon: <ReceiptIcon />, path: '/admin/orders' },
  ];

  //  Desktop: permanent + collapsible
  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            overflowX: 'hidden',
            transition: 'width .2s',
            borderRight: `1px solid rgba(0,0,0,0.12)`,
          },
        }}
      >
        <Toolbar />

        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={pathname.startsWith(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  }

  //  Mobile: temporary overlay drawer
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onToggleMenu}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <Box onClick={onToggleMenu}>
        {' '}
        {/* click closes sidebar on mobile */}
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={pathname.startsWith(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
