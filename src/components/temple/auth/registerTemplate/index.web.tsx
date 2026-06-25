import { Pressable, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { getAppName } from '../../../../helpers';
import { useTheme } from '../../../../theme';
import { LogoSvg } from '../../../atoms';
import { RegisterForm } from '../../../molecules';
import { RegisterTemplateProps } from './types';

export const RegisterTemplate = ({ onSubmit, onBack, loading }: RegisterTemplateProps) => {
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
          style={{ color: theme.colors.onPrimary, marginTop: theme.spacing.lg, textAlign: 'center' }}
        >
          {getAppName()}
        </Text>
        <Text
          variant="bodyLarge"
          style={{ color: theme.colors.onPrimary, opacity: 0.85, marginTop: theme.spacing.sm, textAlign: 'center' }}
        >
          Tu visión, en un solo lugar
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: theme.spacing.xxl,
          gap: theme.spacing.lg,
        }}
        style={{ flex: 1, maxWidth: 520, alignSelf: 'center', width: '100%' }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ gap: theme.spacing.xs }}>
          <Text variant="headlineMedium" style={{ color: theme.colors.text }}>
            Crear cuenta
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted }}>
            Comienza tu experiencia con {getAppName()}
          </Text>
        </View>

        <RegisterForm onSubmit={onSubmit} loading={loading} />

        <Pressable onPress={onBack} style={{ alignItems: 'center' }}>
          <Text variant="bodyMedium" style={{ color: theme.colors.primary }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
