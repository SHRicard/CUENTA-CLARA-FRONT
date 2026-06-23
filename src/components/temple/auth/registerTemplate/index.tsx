import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useKeyboardVisible } from '../../../../hooks';
import { useTheme } from '../../../../theme';
import { Logo, LogoHorizontal } from '../../../atoms';
import { RegisterForm } from '../../../molecules';
import { RegisterTemplateProps } from './types';

export const RegisterTemplate = ({ onSubmit, onBack, loading }: RegisterTemplateProps) => {
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
          <Logo size="md" />
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>
            Crear cuenta
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>
            Comienza tu experiencia con Ojo Super
          </Text>
        </View>
      )}

      <RegisterForm onSubmit={onSubmit} loading={loading} />
    </View>
  );
};
