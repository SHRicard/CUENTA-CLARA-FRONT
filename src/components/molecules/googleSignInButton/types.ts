import { Credentials } from '../../../interface';

export interface GoogleSignInButtonProps {
  onSuccess: (credentials: Credentials) => void;
  onError?: (message: string) => void;
}
