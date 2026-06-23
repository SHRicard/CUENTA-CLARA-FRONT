import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';

import { RegisterTemplate } from '../../../components';
import { PublicStackParamList, RegisterFormData } from '../../../interface';
import { useSnackbar } from '../../../snackbar';
import { setCredentials } from '../../../store/auth';
import { useRegisterMutation } from '../../../store';
import { AppDispatch } from '../../../store/store';

type Nav = NativeStackNavigationProp<PublicStackParamList, 'Register'>;

export const Register = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useSnackbar();
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword: _confirmPassword, ...payload } = data;
      const credentials = await register(payload).unwrap();
      dispatch(setCredentials(credentials));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear cuenta';
      showError(message);
    }
  };

  return (
    <RegisterTemplate
      onSubmit={onSubmit}
      onBack={() => navigation.goBack()}
      loading={isLoading}
    />
  );
};
