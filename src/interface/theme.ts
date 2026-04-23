import { ReactNode } from 'react';

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Radius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface FontSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface FontWeight {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export type Mode = 'light' | 'dark';

export type PaletteName = 'ocean' | 'forest' | 'sunset' | 'royal' | 'slate' | 'mono';

export interface ColorScheme {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  background: string;
  surface: string;
  surfaceVariant: string;
  text: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface Palette {
  name: string;
  label: string;
  description: string;
  light: ColorScheme;
  dark: ColorScheme;
}

export type ModePreference = Mode | 'system';

export interface Theme {
  mode: Mode;
  palette: PaletteName;
  colors: ColorScheme;
  spacing: Spacing;
  radius: Radius;
  fontSize: FontSize;
  fontWeight: FontWeight;
  isDark: boolean;
}

export interface ThemeContextValue {
  theme: Theme;
  modePreference: ModePreference;
  setMode: (mode: ModePreference) => void;
  toggleMode: () => void;
  palette: PaletteName;
  setPalette: (palette: PaletteName) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultPalette?: PaletteName;
  defaultMode?: ModePreference;
}
