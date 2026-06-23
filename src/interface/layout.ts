import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface SafeLayoutProps {
  children: ReactNode;
  background?: string;
  maxWidth?: number;
}

export interface KeyboardAwareLayoutProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
}

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
