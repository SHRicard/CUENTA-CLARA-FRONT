import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';

import { getApiUrl, getGoogleWebClientId } from '../helpers';
import { Credentials } from '../interface';

export const configureGoogleSignIn = (): void => {
  if (Platform.OS === 'web') return;
  GoogleSignin.configure({
    webClientId: getGoogleWebClientId(),
    offlineAccess: false,
  });
};

export const exchangeGoogleIdToken = async (idToken: string): Promise<Credentials> => {
  const res = await fetch(`${getApiUrl()}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    throw new Error(`AUTH_FAILED_${res.status}`);
  }

  return (await res.json()) as Credentials;
};

export const signInWithGoogleNative = async (): Promise<Credentials> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const response = await GoogleSignin.signIn();

  if (!isSuccessResponse(response)) {
    throw new Error('GOOGLE_SIGN_IN_CANCELLED');
  }

  const { idToken } = response.data;

  if (!idToken) {
    throw new Error('GOOGLE_SIGN_IN_NO_TOKEN');
  }

  return exchangeGoogleIdToken(idToken);
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
