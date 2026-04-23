import { Platform, useWindowDimensions } from 'react-native';

export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;

export type DeviceType = 'phone' | 'tablet' | 'desktop';

export interface ResponsiveInfo {
  width: number;
  height: number;
  device: DeviceType;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWeb: boolean;
  isNative: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useResponsive = (): ResponsiveInfo => {
  const { width, height } = useWindowDimensions();

  const device: DeviceType =
    width >= BREAKPOINTS.desktop
      ? 'desktop'
      : width >= BREAKPOINTS.tablet
        ? 'tablet'
        : 'phone';

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
