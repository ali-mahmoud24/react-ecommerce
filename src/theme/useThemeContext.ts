import { useContext } from 'react';
import { ThemeContext } from '@/theme/ThemeContext';

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error('useThemeContext must be used inside ContextProvider');
  return ctx;
}
