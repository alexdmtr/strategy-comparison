import createPersistedState from 'use-persisted-state';

export type Theme = 'dark' | 'light';

const useThemeState = createPersistedState<Theme>('app-theme');

export function useTheme() {
  return useThemeState('light');
}