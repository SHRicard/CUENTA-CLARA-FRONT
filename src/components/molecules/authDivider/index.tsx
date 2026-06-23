import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../../theme';

export interface AuthDividerProps {
  label?: string;
}

export const AuthDivider = ({ label = 'o continúa con' }: AuthDividerProps) => {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
      <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>
        {label}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
    </View>
  );
};
