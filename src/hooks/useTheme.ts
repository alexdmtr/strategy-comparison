import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createTheme, Theme } from '@mui/material/styles';
import { useMemo } from 'react';

export type ThemeMode = 'dark' | 'light';

const themeModeAtom = atomWithStorage<ThemeMode>('app-theme', 'light');

export function useTheme(): [ThemeMode, (mode: ThemeMode) => void] {
  return useAtom(themeModeAtom);
}

export function useMuiTheme(): Theme {
  const [mode] = useTheme();
  return useMemo(() => createTheme({ palette: { mode } }), [mode]);
}