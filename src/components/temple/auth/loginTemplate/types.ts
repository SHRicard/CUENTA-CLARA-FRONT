import { Credentials, LoginFormData } from '../../../../interface';

export interface LoginTemplateProps {
  onLogin: (data: LoginFormData) => void | Promise<void>;
  onGoogleSuccess: (credentials: Credentials) => void;
  onGoogleError?: (message: string) => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  loading?: boolean;
}
