import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';

import { PALETTE_NAMES } from '../../../const';
import { ModePreference, PaletteName, RootStackParamList } from '../../../interface';
import { useTheme } from '../../../theme';

export const Settings = () => {
  const { theme, modePreference, setMode, palette, setPalette } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
            mode={palette === name ? 'contained' : 'outlined'}
            onPress={() => setPalette(name as PaletteName)}
          >
            {name}
          </Button>
        ))}
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">Developer</Text>
        <Button mode="contained-tonal" onPress={() => navigation.navigate('DesignSystem')}>
          Open Design System
        </Button>
      </View>
    </ScrollView>
  );
};
