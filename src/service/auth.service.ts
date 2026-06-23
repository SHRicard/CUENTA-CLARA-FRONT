import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

import { getGoogleWebClientId } from '../helpers';

export const configureGoogleSignIn = (): void => {
  if (Platform.OS === 'web') return;
  GoogleSignin.configure({
    webClientId: getGoogleWebClientId(),
    offlineAccess: false,
  });
};

export const getGoogleIdTokenNative = async (): Promise<string> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error('GOOGLE_SIGN_IN_CANCELLED');
  }

  const { idToken } = response.data;

  if (!idToken) {
    throw new Error('GOOGLE_SIGN_IN_NO_TOKEN');
  }

  return idToken;
};

export const signOutGoogle = async (): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    // revokeAccess desvincula la cuenta para que el próximo signIn muestre el selector
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (err) {
    if (isErrorWithCode(err) && err.code === statusCodes.SIGN_IN_REQUIRED) return;
    throw err;
  }
};
