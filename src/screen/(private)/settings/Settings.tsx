import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';

import { PALETTE_NAMES, PALETTES } from '../../../const';
import { Language, useLanguage } from '../../../i18n';
import { ModePreference, PaletteName } from '../../../interface';
import { useTheme } from '../../../theme';

export const Settings = () => {
  const { theme, modePreference, setMode, palette, setPalette } = useTheme();
  const { t: translate } = useTranslation();
  const { language, setLanguage, languages } = useLanguage();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: theme.spacing.lg, gap: theme.spacing.lg }}
    >
      <Text variant="headlineMedium">{translate('settings.title')}</Text>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">{translate('settings.mode')}</Text>
        <SegmentedButtons
          value={modePreference}
          onValueChange={(v) => setMode(v as ModePreference)}
          buttons={[
            { value: 'light', label: translate('settings.light') },
            { value: 'dark', label: translate('settings.dark') },
            { value: 'system', label: translate('settings.system') },
          ]}
        />
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">{translate('settings.language')}</Text>
        <SegmentedButtons
          value={language}
          onValueChange={(v) => setLanguage(v as Language)}
          buttons={languages.map((lng) => ({ value: lng, label: translate(`languages.${lng}`) }))}
        />
      </View>

      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="titleMedium">{translate('settings.palette')}</Text>
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
