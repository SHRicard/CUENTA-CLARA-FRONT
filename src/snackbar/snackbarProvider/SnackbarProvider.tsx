import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Icon, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  SnackbarContextValue,
  SnackbarOptions,
  SnackbarProviderProps,
  SnackbarVariant,
} from '../../interface';
import { useTheme } from '../../theme';

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const DEFAULT_DURATION = 3000;

const ICON_BY_VARIANT: Record<SnackbarVariant, string | undefined> = {
  success: 'check-circle',
  error: 'alert-circle',
  warning: 'alert',
  info: 'information',
  default: undefined,
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const translateX = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setVisible(false);
  }, []);

  const show = useCallback((opts: SnackbarOptions) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOptions(opts);
    setVisible(true);
  }, []);

  const showSuccess = useCallback(
    (message: string, extra?: Partial<SnackbarOptions>) =>
      show({ ...extra, message, variant: 'success' }),
    [show],
  );
  const showError = useCallback(
    (message: string, extra?: Partial<SnackbarOptions>) =>
      show({ ...extra, message, variant: 'error' }),
    [show],
  );
  const showWarning = useCallback(
    (message: string, extra?: Partial<SnackbarOptions>) =>
      show({ ...extra, message, variant: 'warning' }),
    [show],
  );
  const showInfo = useCallback(
    (message: string, extra?: Partial<SnackbarOptions>) =>
      show({ ...extra, message, variant: 'info' }),
    [show],
  );

  useEffect(() => {
    if (visible && options) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: 0,
          damping: 18,
          stiffness: 180,
          mass: 0.9,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();

      const duration = options.duration ?? DEFAULT_DURATION;
      timerRef.current = setTimeout(() => setVisible(false), duration);
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 500,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, options, translateX, opacity]);

  const value = useMemo<SnackbarContextValue>(
    () => ({ show, showSuccess, showError, showWarning, showInfo, hide }),
    [show, showSuccess, showError, showWarning, showInfo, hide],
  );

  const variant: SnackbarVariant = options?.variant ?? 'default';

  const bgByVariant: Record<SnackbarVariant, string> = {
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
    info: theme.colors.info,
    default: theme.colors.surfaceVariant,
  };

  const fg = variant === 'default' ? theme.colors.text : '#ffffff';
  const bg = bgByVariant[variant];
  const iconName = options?.icon ?? ICON_BY_VARIANT[variant];

  const handleActionPress = () => {
    options?.action?.onPress();
    hide();
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Portal>
        <Animated.View
          pointerEvents={visible ? 'box-none' : 'none'}
          style={[
            styles.container,
            {
              top: insets.top + 8,
              transform: [{ translateX }],
              opacity,
            },
          ]}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: bg,
                borderRadius: theme.radius.md,
              },
            ]}
          >
            {iconName && <Icon source={iconName} size={20} color={fg} />}
            <Text style={[styles.message, { color: fg }]} numberOfLines={3}>
              {options?.message}
            </Text>
            {options?.action && (
              <Pressable onPress={handleActionPress} hitSlop={8}>
                <Text style={[styles.actionLabel, { color: fg }]}>{options.action.label}</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </Portal>
    </SnackbarContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    minWidth: 256,
    maxWidth: 560,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  message: { flex: 1, fontSize: 14 },
  actionLabel: {
    fontWeight: '700',
    paddingHorizontal: 8,
    textTransform: 'uppercase',
    fontSize: 12,
  },
});
