import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../hooks';
import { SafeLayoutProps } from '../../interface';
import { useTheme } from '../../theme';
import { DEFAULT_MAX_WIDTH } from '../../const';

export const SafeLayout = ({
  children,
  background,
  maxWidth = DEFAULT_MAX_WIDTH,
}: SafeLayoutProps) => {
  const insets = useSafeAreaInsets();
  const { isWeb, isTablet, isDesktop } = useResponsive();
  const { theme } = useTheme();
  const shouldConstrainWidth = isWeb || isTablet || isDesktop;
  const bg = background ?? theme.colors.background;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: bg,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={[styles.content, shouldConstrainWidth && { maxWidth, alignSelf: 'center' }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, width: '100%' },
});
