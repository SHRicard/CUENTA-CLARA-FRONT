import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useKeyboardVisible } from '../../../../hooks';
import { useTheme } from '../../../../theme';
import { LogoSvg, LogoHorizontal } from '../../../atoms';
import { AuthDivider, AuthLinks, GoogleSignInButton, LoginForm } from '../../../molecules';
import { LoginTemplateProps } from './types';

export const LoginTemplate = ({
  onLogin,
  onGoogleSuccess,
  onGoogleError,
  onForgotPassword,
  onRegister,
  loading,
}: LoginTemplateProps) => {
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
        <View style={{ paddingBottom: theme.spacing.lg + 25 }}>
          <LogoHorizontal />
        </View>
      ) : (
        <View style={{ alignItems: 'center', gap: theme.spacing.sm }}>
          <LogoSvg size="md" />
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>
            Bienvenido
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted }}>
            Inicia sesión para continuar
          </Text>
        </View>
      )}

      <LoginForm onSubmit={onLogin} loading={loading} />

      <AuthDivider />

      <GoogleSignInButton onSuccess={onGoogleSuccess} onError={onGoogleError} />

      <AuthLinks onForgotPassword={onForgotPassword} onRegister={onRegister} />
    </View>
  );
};
