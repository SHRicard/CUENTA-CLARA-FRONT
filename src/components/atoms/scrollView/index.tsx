import { forwardRef } from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';

import { useTheme } from '../../../theme';

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>((props, ref) => {
  const { theme } = useTheme();

  return (
    <RNScrollView
      ref={ref}
      indicatorStyle={theme.isDark ? 'white' : 'black'}
      showsVerticalScrollIndicator
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
});

ScrollView.displayName = 'ScrollView';
