import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../../../theme';
import { Logo } from '../../../atoms';
import { ForgotPasswordForm } from '../../../molecules';
import { ForgotPasswordTemplateProps } from './types';

export const ForgotPasswordTemplate = ({ onSubmit, onBack, loading, sent }: ForgotPasswordTemplateProps) => {
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
        <Logo size="lg" variant="light" />
        <Text
          variant="headlineMedium"
          style={{ color: theme.colors.onPrimary, marginTop: theme.spacing.lg, textAlign: 'center' }}
        >
          Ojo Super
        </Text>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onPrimary, opacity: 0.85, marginTop: theme.spacing.sm, textAlign: 'center' }}
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
            Recuperar contraseña
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted }}>
            Ingresa el email asociado a tu cuenta y te enviaremos las instrucciones
          </Text>
        </View>

        <ForgotPasswordForm onSubmit={onSubmit} loading={loading} sent={sent} />

        <Pressable onPress={onBack} style={{ alignItems: 'center' }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            ← Volver a iniciar sesión
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
