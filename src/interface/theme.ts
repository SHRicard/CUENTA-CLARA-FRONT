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

export interface InterFamily {
  thin: string;
  extraLight: string;
  light: string;
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  extraBold: string;
  black: string;
}

export interface QuicksandFamily {
  light: string;
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface LatoFamily {
  thin: string;
  thinItalic: string;
  light: string;
  lightItalic: string;
  regular: string;
  italic: string;
  bold: string;
  boldItalic: string;
  black: string;
  blackItalic: string;
}

export interface Fonts {
  inter: InterFamily;
  quicksand: QuicksandFamily;
  lato: LatoFamily;
}

export type Mode = 'light' | 'dark';

export type PaletteName = 'ocean';

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
  icon: string;
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
  fonts: Fonts;
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
