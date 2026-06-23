import { ScrollView, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';

import { PALETTE_NAMES, PALETTES } from '../../../const';
import { ModePreference, PaletteName } from '../../../interface';
import { useTheme } from '../../../theme';

export const Settings = () => {
  const { theme, modePreference, setMode, palette, setPalette } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}
    >
      <Text variant="headlineMedium">Settings</Text>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">Mode</Text>
        <SegmentedButtons
          value={modePreference}
          onValueChange={(v) => setMode(v as ModePreference)}
          buttons={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
        />
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">Palette</Text>
        {PALETTE_NAMES.map((name) => (
          <Button
            key={name}
            icon={PALETTES[name].icon}
            mode={palette === name ? 'contained' : 'outlined'}
            onPress={() => setPalette(name as PaletteName)}
          >
            {PALETTES[name].label}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};
