import { ForgotPasswordFormData } from '../../../../interface';

export interface ForgotPasswordTemplateProps {
  onSubmit: (data: ForgotPasswordFormData) => void | Promise<void>;
  onBack: () => void;
  loading?: boolean;
  sent?: boolean;
}
