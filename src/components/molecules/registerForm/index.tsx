import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import { RegisterFormData } from '../../../interface';
import { useTheme } from '../../../theme';
import { Button, FieldText, PasswordField } from '../../atoms';
import { PasswordStrength } from '../passwordStrength';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void | Promise<void>;
  loading?: boolean;
}

const schema = z
  .object({
    name: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const RegisterForm = ({ onSubmit, loading = false }: RegisterFormProps) => {
  const { theme } = useTheme();

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const password = useWatch({ control, name: 'password' });

  return (
    <View style={{ gap: theme.spacing.md }}>
      <FieldText control={control} name="name" label="Nombre" autoCapitalize="words" />
      <FieldText
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View style={{ gap: theme.spacing.xs }}>
        <PasswordField control={control} name="password" label="Contraseña" />
        <PasswordStrength password={password} />
      </View>
      <PasswordField control={control} name="confirmPassword" label="Confirmar contraseña" />
      <Button fullWidth loading={loading} disabled={loading} onPress={handleSubmit(onSubmit)}>
        Crear cuenta
      </Button>
    </View>
  );
};
