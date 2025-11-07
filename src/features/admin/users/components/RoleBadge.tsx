import { Chip } from '@mui/material';
import { AdminPanelSettings, Person } from '@mui/icons-material';

export default function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === 'admin';

  return (
    <Chip
      label={isAdmin ? 'Admin' : 'User'}
      icon={isAdmin ? <AdminPanelSettings fontSize="small" /> : <Person fontSize="small" />}
      size="small"
      sx={{
        fontWeight: 600,
        borderRadius: '16px',
        backgroundColor: isAdmin
          ? 'rgba(25,118,210,0.12)'
          : 'rgba(46,125,50,0.12)',
        color: isAdmin ? 'primary.main' : 'success.main',
        '& .MuiChip-icon': { color: 'inherit' },
      }}
    />
  );
}
