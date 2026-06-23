import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { z } from 'zod';

import { ForgotPasswordFormData } from '../../../interface';
import { useTheme } from '../../../theme';
import { Button, FieldText } from '../../atoms';

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void | Promise<void>;
  loading?: boolean;
  sent?: boolean;
}

const schema = z.object({
  email: z.string().email('Email inválido'),
});

export const ForgotPasswordForm = ({ onSubmit, loading = false, sent = false }: ForgotPasswordFormProps) => {
  const { theme } = useTheme();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  if (sent) {
    return (
      <View style={{ gap: theme.spacing.sm, alignItems: 'center' }}>
        <Text variant="titleMedium" style={{ color: theme.colors.success }}>
          Revisa tu correo
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>
          Te enviamos las instrucciones para restablecer tu contraseña.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ gap: theme.spacing.md }}>
      <FieldText
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        helperText="Te enviaremos las instrucciones a este correo"
      />
      <Button fullWidth loading={loading} disabled={loading} onPress={handleSubmit(onSubmit)}>
        Enviar instrucciones
      </Button>
    </View>
  );
};
