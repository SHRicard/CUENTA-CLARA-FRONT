import { Palette, PaletteName } from '../interface';

export const STATUS_LIGHT = {
  success: '#16a34a',
  warning: '#ca8a04',
  error: '#dc2626',
  info: '#2563eb',
};

export const STATUS_DARK = {
  success: '#4ade80',
  warning: '#facc15',
  error: '#f87171',
  info: '#60a5fa',
};

export const PALETTES: Record<PaletteName, Palette> = {
  ocean: {
    name: 'ocean',
    label: 'Finanzas',
    icon: 'finance',
    description:
      'Color seleccionado para apps de finanzas: cobros, billeteras, banca o fintech. Sus azules transmiten confianza y seguridad.',
    light: {
      primary: '#0369a1',
      onPrimary: '#ffffff',
      primaryContainer: '#e0f2fe',
      secondary: '#0891b2',
      onSecondary: '#ffffff',
      secondaryContainer: '#cffafe',
      background: '#f4faff',
      surface: '#e8f3fd',
      surfaceVariant: '#d6e8fa',
      text: '#0f172a',
      textMuted: '#5b748f',
      border: '#c3dcf3',
      ...STATUS_LIGHT,
    },
    dark: {
      primary: '#38bdf8',
      onPrimary: '#0c4a6e',
      primaryContainer: '#075985',
      secondary: '#22d3ee',
      onSecondary: '#083344',
      secondaryContainer: '#155e75',
      background: '#0f172a',
      surface: '#1e293b',
      surfaceVariant: '#334155',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
      border: '#334155',
      ...STATUS_DARK,
    },
  },
};

export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];
