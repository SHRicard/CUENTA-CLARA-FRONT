import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';

import { getGoogleWebClientId } from '../helpers';

export const GoogleAuthProvider = ({ children }: { children: ReactNode }) => (
  <GoogleOAuthProvider clientId={getGoogleWebClientId()}>{children}</GoogleOAuthProvider>
);
