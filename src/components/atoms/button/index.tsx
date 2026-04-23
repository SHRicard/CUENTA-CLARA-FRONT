import { Button as PaperButton } from 'react-native-paper';

import { ButtonProps, ButtonSize, ButtonVariant } from '../../../interface';
import { useTheme } from '../../../theme';

const MODE_BY_VARIANT: Record<ButtonVariant, 'contained' | 'contained-tonal' | 'outlined' | 'text'> = {
  primary: 'contained',
  secondary: 'contained-tonal',
  outline: 'outlined',
  ghost: 'text',
  danger: 'contained',
};

const PADDING_BY_SIZE: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: 2, paddingHorizontal: 8 },
  md: { paddingVertical: 6, paddingHorizontal: 16 },
  lg: { paddingVertical: 10, paddingHorizontal: 24 },
};

const FONT_SIZE_BY_SIZE: Record<ButtonSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  onPress,
  children,
}: ButtonProps) => {
  const { theme } = useTheme();
  const buttonColor = variant === 'danger' ? theme.colors.error : undefined;

  return (
    <PaperButton
      mode={MODE_BY_VARIANT[variant]}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      onPress={onPress}
      buttonColor={buttonColor}
      style={fullWidth ? { width: '100%' } : undefined}
      contentStyle={PADDING_BY_SIZE[size]}
      labelStyle={{ fontSize: FONT_SIZE_BY_SIZE[size] }}
    >
      {children}
    </PaperButton>
  );
};
