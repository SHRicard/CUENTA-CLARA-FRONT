import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../../theme';

export interface AuthLinksProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const AuthLinks = ({ onForgotPassword, onRegister }: AuthLinksProps) => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm, alignItems: 'center' }}>
      {onForgotPassword && (
        <Pressable onPress={onForgotPassword}>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            ¿Olvidaste tu contraseña?
          </Text>
        </Pressable>
      )}
      {onRegister && (
        <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted }}>
            ¿No tienes cuenta?
          </Text>
          <Pressable onPress={onRegister}>
            <Text variant="bodyMedium" style={{ color: theme.colors.primary, fontWeight: '600' }}>
              Crear cuenta
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
