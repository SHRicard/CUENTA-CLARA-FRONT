import { FAB, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isDev } from '../../helpers';
import { navigationRef } from '../../router';
import { useTheme } from '../../theme';

export const DesignSystemFab = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  if (!isDev()) return null;

  const onPress = () => {
    if (navigationRef.isReady()) {
      navigationRef.navigate('DesignSystem');
    }
  };

  return (
    <Portal>
      <FAB
        icon="flask"
        onPress={onPress}
        size="small"
        color={theme.colors.onPrimary}
        style={{
          position: 'absolute',
          top: insets.top + 12,
          right: 12,
          backgroundColor: theme.colors.primary,
        }}
      />
    </Portal>
  );
};
