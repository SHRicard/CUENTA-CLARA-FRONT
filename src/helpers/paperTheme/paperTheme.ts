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
      onPrimaryContainer: colors.text,
      secondary: colors.secondary,
      onSecondary: colors.onSecondary,
      secondaryContainer: colors.secondaryContainer,
      onSecondaryContainer: colors.text,
      background: colors.background,
      onBackground: colors.text,
      surface: colors.surface,
      onSurface: colors.text,
      surfaceVariant: colors.surfaceVariant,
      onSurfaceVariant: colors.textMuted,
      surfaceDisabled: colors.surfaceVariant,
      onSurfaceDisabled: colors.textMuted,
      outline: colors.border,
      outlineVariant: colors.border,
      error: colors.error,
      errorContainer: colors.error,
      onError: '#ffffff',
      onErrorContainer: '#ffffff',
      elevation: {
        level0: 'transparent',
        level1: colors.surface,
        level2: colors.surfaceVariant,
        level3: colors.surfaceVariant,
        level4: colors.surfaceVariant,
        level5: colors.surfaceVariant,
      },
    },
  };
};
