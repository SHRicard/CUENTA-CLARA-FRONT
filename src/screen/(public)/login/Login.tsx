import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { LoginTemplate } from '../../../components';
import { Credentials, LoginFormData, PublicStackParamList } from '../../../interface';
import { useSnackbar } from '../../../snackbar';
import { setCredentials } from '../../../store/auth';
import { AppDispatch } from '../../../store/store';

type Nav = NativeStackNavigationProp<PublicStackParamList, 'Login'>;

export const Login = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useSnackbar();

  const onLogin = (data: LoginFormData) => {
    dispatch(
      setCredentials({
        user: { id: '1', email: data.email, name: data.email.split('@')[0] || 'User' },
        token: 'mock-token',
      }),
    );
  };

  const onGoogleSuccess = (credentials: Credentials) => {
    dispatch(setCredentials(credentials));
  };

  return (
    <LoginTemplate
      onLogin={onLogin}
      onGoogleSuccess={onGoogleSuccess}
      onGoogleError={(message) => showError(message)}
      onForgotPassword={() => navigation.navigate('ForgotPassword')}
      onRegister={() => navigation.navigate('Register')}
    />
  );
};
