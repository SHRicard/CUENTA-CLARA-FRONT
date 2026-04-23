import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

import { ColorScheme, Mode } from '../../interface';

export const buildPaperTheme = (colors: ColorScheme, mode: Mode): MD3Theme => {
  const base = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
  return {
    ...base,
    dark: mode === 'dark',
    colors: {
      ...base.colors,
      primary: colors.primary,
      onPrimary: colors.onPrimary,
      primaryContainer: colors.primaryContainer,
      secondary: colors.secondary,
      onSecondary: colors.onSecondary,
      secondaryContainer: colors.secondaryContainer,
      background: colors.background,
      onBackground: colors.text,
      surface: colors.surface,
      onSurface: colors.text,
      surfaceVariant: colors.surfaceVariant,
      onSurfaceVariant: colors.textMuted,
      outline: colors.border,
      error: colors.error,
    },
  };
};
