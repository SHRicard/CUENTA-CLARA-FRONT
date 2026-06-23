import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';

import { ForgotPasswordTemplate } from '../../../components';
import { ForgotPasswordFormData, PublicStackParamList } from '../../../interface';
import { useSnackbar } from '../../../snackbar';
import { useForgotPasswordMutation } from '../../../store';

type Nav = NativeStackNavigationProp<PublicStackParamList, 'ForgotPassword'>;

export const ForgotPassword = () => {
  const navigation = useNavigation<Nav>();
  const { showError } = useSnackbar();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPassword(data).unwrap();
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al enviar';
      showError(message);
    }
  };

  return (
    <ForgotPasswordTemplate
      onSubmit={onSubmit}
      onBack={() => navigation.goBack()}
      loading={isLoading}
      sent={sent}
    />
  );
};
