import { RegisterFormData } from '../../../../interface';

export interface RegisterTemplateProps {
  onSubmit: (data: RegisterFormData) => void | Promise<void>;
  onBack: () => void;
  loading?: boolean;
}
