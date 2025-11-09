import type { Theme } from '@mui/material';
import { toast } from 'react-hot-toast';

export const showToast = (message: string, type: 'success' | 'error' = 'success', theme: Theme) => {
    const isDark = theme.palette.mode === 'dark';

    toast[type](message, {
        position: 'top-center',
        duration: 3000,
        style: {
            background: isDark ? '#1E1E1E' : '#F3F4F6',
            color: isDark ? '#F3F4F6' : '#111111',
            // background: isDark ? '#FFFFFF' : '#111111',
            // color: isDark ? '#111111' : '#F3F4F6',
            borderRadius: 12,
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
            boxShadow: isDark
                ? '0 2px 10px rgba(0,0,0,0.5)'
                : '0 2px 6px rgba(0,0,0,0.15)',
            padding: '12px 20px',
        },
    });
};

