import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../../../store/auth';
import { AppDispatch } from '../../../store/store';
import { useTheme } from '../../../theme';

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (!email) return;
    dispatch(
      setCredentials({
        user: { id: '1', email, name: email.split('@')[0] || 'User' },
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
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={onLogin}>
        Sign in
      </Button>
    </View>
  );
};
