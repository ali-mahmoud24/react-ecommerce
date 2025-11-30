import { Box, List, ListItemButton, ListItemText, Typography, alpha, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router';

interface NavLinksProps {
  links: { label: string; to: string }[];
  onClick?: () => void;
  isMobile?: boolean;
}

export default function NavLinks({ links, onClick, isMobile = false }: NavLinksProps) {
  const theme = useTheme();
  const location = useLocation();

  return isMobile ? (
    <List>
      {links.map((link) => {
        const isActive = location.pathname.startsWith(link.to);
        return (
          <ListItemButton
            key={link.label}
            component={Link}
            to={link.to}
            selected={isActive}
            onClick={onClick}
            sx={{
              borderRadius: 2,
              mb: 1,
              px: 2,
              bgcolor: isActive ? theme.palette.action.selected : 'transparent',
              borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
              '&:hover': { bgcolor: isActive ? theme.palette.action.selected : theme.palette.action.hover },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemText
              primary={link.label}
              primaryTypographyProps={{
                color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                fontWeight: isActive ? 600 : 500,
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  ) : (
    <Box display="flex" gap={3} alignItems="center" flexGrow={1} justifyContent="center">
      {links.map((link) => {
        const isActive = location.pathname.startsWith(link.to);
        return (
          <Typography
            key={link.label}
            component={Link}
            to={link.to}
            sx={{
              textDecoration: 'none',
              color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
              fontWeight: 600,
              px: 1,
              py: 1,
              borderRadius: 1,
              backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isActive ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
                color: isActive ? theme.palette.primary.contrastText : theme.palette.primary.main,
              },
            }}
          >
            {link.label}
          </Typography>
        );
      })}
    </Box>
  );
}
