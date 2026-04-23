import { Platform, useWindowDimensions } from 'react-native';

import { DeviceType, ResponsiveInfo } from '../../interface';
import { BREAKPOINTS } from '../../const';

export const useResponsive = (): ResponsiveInfo => {
  const { width, height } = useWindowDimensions();

  const device: DeviceType =
    width >= BREAKPOINTS.desktop ? 'desktop' : width >= BREAKPOINTS.tablet ? 'tablet' : 'phone';

  return {
    width,
    height,
    device,
    isPhone: device === 'phone',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    isWeb: Platform.OS === 'web',
    isNative: Platform.OS !== 'web',
    isPortrait: height >= width,
    isLandscape: width > height,
  };
};
