import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';

import { ColorScheme, Mode } from '../../interface';

export const buildNavTheme = (colors: ColorScheme, mode: Mode): NavTheme => {
  const base = mode === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: mode === 'dark',
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.error,
    },
  };
};
