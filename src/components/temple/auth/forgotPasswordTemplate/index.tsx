import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useKeyboardVisible } from '../../../../hooks';
import { useTheme } from '../../../../theme';
import { Logo, LogoHorizontal } from '../../../atoms';
import { ForgotPasswordForm } from '../../../molecules';
import { ForgotPasswordTemplateProps } from './types';

export const ForgotPasswordTemplate = ({ onSubmit, onBack, loading, sent }: ForgotPasswordTemplateProps) => {
  const { theme } = useTheme();
  const keyboardVisible = useKeyboardVisible();

  return (
    <View
      style={{
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
        backgroundColor: theme.colors.background,
      }}
    >
      {keyboardVisible ? (
        <View style={{ paddingBottom: theme.spacing.lg }}>
          <LogoHorizontal />
        </View>
      ) : (
        <View style={{ alignItems: 'center', gap: theme.spacing.sm }}>
          <Logo size="sm" />
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>
            Recuperar contraseña
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>
            Ingresa el email asociado a tu cuenta
          </Text>
        </View>
      )}

      <ForgotPasswordForm onSubmit={onSubmit} loading={loading} sent={sent} />

      <Pressable onPress={onBack} style={{ alignItems: 'center' }}>
        <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
          ← Volver a iniciar sesión
        </Text>
      </Pressable>
    </View>
  );
};
