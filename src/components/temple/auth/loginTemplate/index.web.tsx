import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { getAppName } from '../../../../helpers';
import { useTheme } from '../../../../theme';
import { LogoSvg } from '../../../atoms';
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

  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing.xl,
        }}
      >
        <LogoSvg size="lg" variant="light" />
        <Text
          variant="headlineMedium"
          style={{
            color: theme.colors.onPrimary,
            marginTop: theme.spacing.lg,
            textAlign: 'center',
          }}
        >
          {getAppName()}
        </Text>
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onPrimary,
            opacity: 0.85,
            marginTop: theme.spacing.sm,
            textAlign: 'center',
          }}
        >
          Tu visión, en un solo lugar
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: theme.spacing.xxl,
          maxWidth: 520,
          alignSelf: 'center',
          width: '100%',
          gap: theme.spacing.lg,
        }}
      >
        <View style={{ gap: theme.spacing.xs }}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text }}>
            Bienvenido
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted }}>
            Inicia sesión para continuar
          </Text>
        </View>

        <LoginForm onSubmit={onLogin} loading={loading} />

        <AuthDivider />

        <GoogleSignInButton onSuccess={onGoogleSuccess} onError={onGoogleError} />

        <AuthLinks onForgotPassword={onForgotPassword} onRegister={onRegister} />
      </View>
    </View>
  );
};
