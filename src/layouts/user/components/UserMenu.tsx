import {
    IconButton,
    alpha,
    useTheme,
    Avatar,
    Menu,
    MenuItem,
    Link,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { memo } from 'react';


export const UserMenu = memo(
    ({
        user,
        anchorEl,
        onOpen,
        onClose,
        onLogout,
    }: {
        user: any;
        anchorEl: HTMLElement | null;
        onOpen: (e: React.MouseEvent<HTMLElement>) => void;
        onClose: () => void;
        onLogout: () => void;
    }) => {
        const theme = useTheme();

        const getInitials = () => {
            if (!user) return '?';
            const first = user.firstName?.[0] || '';
            const last = user.lastName?.[0] || '';
            return (first + last).toUpperCase() || 'U';
        };

        return (
            <>
                <IconButton sx={{ p: { xs: 0.5, sm: 1 } }} onClick={onOpen}>
                    <Avatar
                        alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                        src={user?.profileImageUrl || ''}
                        variant="square"
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            bgcolor: user?.avatar
                                ? 'transparent'
                                : theme.palette.mode === 'light'
                                    ? theme.palette.primary.main
                                    : theme.palette.primary.light,
                            color: user?.avatar
                                ? 'inherit'
                                : theme.palette.getContrastText(
                                    theme.palette.mode === 'light'
                                        ? theme.palette.primary.main
                                        : theme.palette.primary.light,
                                ),
                            fontWeight: 600,
                            fontSize: '1rem',
                            border: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            },
                        }}
                    >
                        {!user?.avatar && getInitials()}
                    </Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={onClose}
                    PaperProps={{ sx: { borderRadius: 1, mt: 1, minWidth: 160 } }}
                >
                    <MenuItem component={Link} to="/profile">
                        <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} /> Profile
                    </MenuItem>

                    <MenuItem component={Link} to="/login" onClick={onLogout}>
                        <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                </Menu>
            </>
        );
    },
);