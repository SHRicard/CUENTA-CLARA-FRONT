import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components';
import { signInWithGoogleNative } from '../../../service';
import { useSnackbar } from '../../../snackbar';
import { setCredentials } from '../../../store/auth';
import { AppDispatch } from '../../../store/store';

export const GoogleSignInButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    try {
      setLoading(true);
      const credentials = await signInWithGoogleNative();
      dispatch(setCredentials(credentials));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error con Google';
      if (message !== 'GOOGLE_SIGN_IN_CANCELLED') {
        showError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" fullWidth icon="google" loading={loading} disabled={loading} onPress={onPress}>
      Continuar con Google
    </Button>
  );
};
