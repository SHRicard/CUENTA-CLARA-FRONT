import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { Button, FieldText } from '../../../components';
import { RootStackParamList } from '../../../interface';
import { setCredentials } from '../../../store/auth';
import { AppDispatch } from '../../../store/store';
import { useTheme } from '../../../theme';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof schema>;

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginForm) => {
    dispatch(
      setCredentials({
        user: { id: '1', email: data.email, name: data.email.split('@')[0] || 'User' },
        token: 'mock-token',
      }),
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium">Sign in</Text>
      <FieldText
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <FieldText control={control} name="password" label="Password" secureTextEntry />
      <Button fullWidth onPress={handleSubmit(onSubmit)}>
        Sign in
      </Button>
      <Button variant="ghost" onPress={() => navigation.navigate('DesignSystem')}>
        View Design System
      </Button>
    </View>
  );
};
