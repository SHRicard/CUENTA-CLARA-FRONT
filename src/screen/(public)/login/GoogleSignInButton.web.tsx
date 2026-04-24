import { GoogleLogin } from '@react-oauth/google';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { exchangeGoogleIdToken } from '../../../service';
import { useSnackbar } from '../../../snackbar';
import { setCredentials } from '../../../store/auth';
import { AppDispatch } from '../../../store/store';

export const GoogleSignInButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showError } = useSnackbar();

  return (
    <View style={{ alignItems: 'center' }}>
      <GoogleLogin
        onSuccess={async (response) => {
          try {
            const idToken = response.credential;
            if (!idToken) throw new Error('GOOGLE_SIGN_IN_NO_TOKEN');
            const credentials = await exchangeGoogleIdToken(idToken);
            dispatch(setCredentials(credentials));
          } catch (err) {
            const message = err instanceof Error ? err.message : 'Error con Google';
            showError(message);
          }
        }}
        onError={() => showError('No se pudo iniciar sesión con Google')}
        text="continue_with"
        theme="outline"
        size="large"
      />
    </View>
  );
};
