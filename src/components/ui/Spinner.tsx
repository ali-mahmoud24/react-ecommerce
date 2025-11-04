import { CircularProgress } from '@mui/material';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeMap = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  return (
    <CircularProgress
      size={sizeMap[size]}
      className={className}
    />
  );
}