import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../../store/auth';
import { AppDispatch, RootState } from '../../../store/store';
import { useTheme } from '../../../theme';

export const Profile = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);

  return (
    <View
      style={{
        flex: 1,
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium">Profile</Text>
      <Text variant="bodyLarge">Email: {user?.email}</Text>
      <Text variant="bodyLarge">Name: {user?.name}</Text>
      <Button mode="contained" onPress={() => dispatch(logout())}>
        Logout
      </Button>
    </View>
  );
};
