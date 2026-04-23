import { ReactNode } from 'react';

export interface SafeLayoutProps {
  children: ReactNode;
  background?: string;
  maxWidth?: number;
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
