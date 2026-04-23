import { Text, View } from 'react-native';

import { BadgeProps, BadgeSize, BadgeVariant } from '../../../interface';
import { useTheme } from '../../../theme';

const SIZE_CONFIG: Record<
  BadgeSize,
  { height: number; minWidth: number; paddingHorizontal: number; fontSize: number; radius: number }
> = {
  sm: { height: 16, minWidth: 16, paddingHorizontal: 6, fontSize: 10, radius: 8 },
  md: { height: 20, minWidth: 20, paddingHorizontal: 8, fontSize: 12, radius: 10 },
  lg: { height: 28, minWidth: 28, paddingHorizontal: 12, fontSize: 14, radius: 14 },
};

const DOT_SIZE: Record<BadgeSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

export const Badge = ({
  variant = 'primary',
  size = 'md',
  outline = false,
  dot = false,
  children,
}: BadgeProps) => {
  const { theme } = useTheme();

  const palette: Record<BadgeVariant, { bg: string; fg: string }> = {
    primary: { bg: theme.colors.primary, fg: theme.colors.onPrimary },
    secondary: { bg: theme.colors.secondary, fg: theme.colors.onSecondary },
    success: { bg: theme.colors.success, fg: '#ffffff' },
    warning: { bg: theme.colors.warning, fg: '#ffffff' },
    error: { bg: theme.colors.error, fg: '#ffffff' },
    info: { bg: theme.colors.info, fg: '#ffffff' },
    neutral: { bg: theme.colors.surfaceVariant, fg: theme.colors.textMuted },
  };

  const { bg, fg } = palette[variant];

  if (dot) {
    const d = DOT_SIZE[size];
    return (
      <View
        style={{
          width: d,
          height: d,
          borderRadius: d / 2,
          backgroundColor: outline ? 'transparent' : bg,
          borderWidth: outline ? 1.5 : 0,
          borderColor: bg,
        }}
      />
    );
  }

  const cfg = SIZE_CONFIG[size];

  return (
    <View
      style={{
        height: cfg.height,
        minWidth: cfg.minWidth,
        paddingHorizontal: cfg.paddingHorizontal,
        borderRadius: cfg.radius,
        backgroundColor: outline ? 'transparent' : bg,
        borderWidth: outline ? 1 : 0,
        borderColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: cfg.fontSize,
          fontWeight: '600',
          color: outline ? bg : fg,
          lineHeight: cfg.fontSize * 1.2,
        }}
        numberOfLines={1}
      >
        {children}
      </Text>
    </View>
  );
};
