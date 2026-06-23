import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import { LoginFormData } from '../../../interface';
import { useTheme } from '../../../theme';
import { Button, FieldText, PasswordField } from '../../atoms';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  loading?: boolean;
}

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
  const { theme } = useTheme();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <View style={{ gap: theme.spacing.md }}>
      <FieldText
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <PasswordField control={control} name="password" label="Contraseña" />
      <Button fullWidth loading={loading} disabled={loading} onPress={handleSubmit(onSubmit)}>
        Iniciar sesión
      </Button>
    </View>
  );
};
