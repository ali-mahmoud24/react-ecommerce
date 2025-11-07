import { Paper, Typography, Box } from '@mui/material';
import type { ReactNode } from 'react';

export default function InfoCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Paper
      sx={(theme) => ({
        p: 2,
        textAlign: 'center',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.paper
          : theme.palette.grey[100],
        color: theme.palette.text.primary,
        border: `1px solid ${
          theme.palette.mode === 'dark'
            ? theme.palette.divider
            : theme.palette.grey[300]
        }`,
      })}
    >
      <Typography
        variant="overline"
        sx={(theme) => ({
          fontWeight: 600,
          color: theme.palette.text.secondary,
        })}
      >
        {label}
      </Typography>

      <Box>{children}</Box>
    </Paper>
  );
}
