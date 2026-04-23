import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Surface, Text, TouchableRipple } from 'react-native-paper';

import { CardPadding, CardProps } from '../../../interface';
import { useTheme } from '../../../theme';

const PADDING_MAP: Record<CardPadding, number> = {
  sm: 12,
  md: 16,
  lg: 24,
};

export const Card = ({
  title,
  subtitle,
  icon,
  rightIcon,
  cover,
  coverAspectRatio = 16 / 9,
  variant = 'elevated',
  padding = 'md',
  onPress,
  actions,
  children,
}: CardProps) => {
  const { theme } = useTheme();
  const pad = PADDING_MAP[padding];
  const hasHeader = !!(title || subtitle || icon || rightIcon);

  const body = (
    <>
      {cover && (
        <Image
          source={{ uri: cover }}
          style={{ width: '100%', aspectRatio: coverAspectRatio }}
          resizeMode="cover"
        />
      )}

      {hasHeader && (
        <View
          style={[
            styles.headerRow,
            {
              padding: pad,
              paddingBottom: children ? 0 : pad,
              gap: theme.spacing.sm,
            },
          ]}
        >
          {icon && (
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
            >
              <Icon source={icon} size={20} color={theme.colors.primary} />
            </View>
          )}
          <View style={styles.headerText}>
            {title && (
              <Text variant="titleMedium" style={{ color: theme.colors.text }} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.textMuted }}
                numberOfLines={2}
              >
                {subtitle}
              </Text>
            )}
          </View>
          {rightIcon && <Icon source={rightIcon} size={20} color={theme.colors.textMuted} />}
        </View>
      )}

      {children && (
        <View
          style={{
            padding: pad,
            paddingTop: hasHeader ? theme.spacing.xs : pad,
            paddingBottom: actions ? theme.spacing.xs : pad,
          }}
        >
          {children}
        </View>
      )}

      {actions && (
        <View
          style={[
            styles.actionsRow,
            {
              paddingHorizontal: pad,
              paddingBottom: pad,
              paddingTop: hasHeader || children ? theme.spacing.xs : pad,
              gap: theme.spacing.sm,
            },
          ]}
        >
          {actions}
        </View>
      )}
    </>
  );

  const containerStyle: ViewStyle = {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    backgroundColor: variant === 'filled' ? theme.colors.surfaceVariant : theme.colors.surface,
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: theme.colors.border,
  };

  const elevation = variant === 'elevated' ? 2 : 0;

  if (onPress) {
    return (
      <Surface style={containerStyle} elevation={elevation}>
        <TouchableRipple onPress={onPress} borderless={false}>
          <View>{body}</View>
        </TouchableRipple>
      </Surface>
    );
  }

  return (
    <Surface style={containerStyle} elevation={elevation}>
      {body}
    </Surface>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: 2 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
});
