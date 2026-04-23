import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive } from '../../hooks';

export interface SafeLayoutProps {
  children: ReactNode;
  background?: string;
  maxWidth?: number;
}

const DEFAULT_MAX_WIDTH = 1024;

export const SafeLayout = ({
  children,
  background = '#ffffff',
  maxWidth = DEFAULT_MAX_WIDTH,
}: SafeLayoutProps) => {
  const insets = useSafeAreaInsets();
  const { isWeb, isTablet, isDesktop } = useResponsive();
  const shouldConstrainWidth = isWeb || isTablet || isDesktop;

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: background,
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
