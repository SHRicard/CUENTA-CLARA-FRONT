import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { useTheme } from '../../../theme';

export const Dashboard = () => {
  const { theme } = useTheme();
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium">Dashboard</Text>
      <Text>Welcome, {user?.name ?? 'guest'}</Text>
    </View>
  );
};
