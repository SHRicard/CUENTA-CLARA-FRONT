import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { FONT_SIZE, FONT_WEIGHT, FONTS, PALETTES, RADIUS, SPACING } from '../../const';
import { injectWebScrollbar } from '../../helpers';
import {
  Mode,
  ModePreference,
  PaletteName,
  Theme,
  ThemeContextValue,
  ThemeProviderProps,
} from '../../interface';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({
  children,
  defaultPalette = 'ocean',
  defaultMode = 'system',
}: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [modePreference, setModePreference] = useState<ModePreference>(defaultMode);
  const [palette, setPalette] = useState<PaletteName>(defaultPalette);

  const resolvedMode: Mode =
    modePreference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : modePreference;

  const toggleMode = useCallback(() => {
    setModePreference((prev) => {
      if (prev === 'system') return systemScheme === 'dark' ? 'light' : 'dark';
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [systemScheme]);

  const resolvedColors = PALETTES[palette][resolvedMode];

  useEffect(() => {
    injectWebScrollbar(resolvedColors);
  }, [resolvedColors]);

  const value = useMemo<ThemeContextValue>(() => {
    const paletteDef = PALETTES[palette];
    const colors = paletteDef[resolvedMode];
    const theme: Theme = {
      mode: resolvedMode,
      palette,
      colors,
      spacing: SPACING,
      radius: RADIUS,
      fontSize: FONT_SIZE,
      fontWeight: FONT_WEIGHT,
      fonts: FONTS,
      isDark: resolvedMode === 'dark',
    };
    return {
      theme,
      modePreference,
      setMode: setModePreference,
      toggleMode,
      palette,
      setPalette,
    };
  }, [palette, resolvedMode, modePreference, toggleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
