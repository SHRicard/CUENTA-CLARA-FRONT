import { ReactNode } from 'react';

import { ButtonVariant, ModalSize } from './components';

export interface ConfirmOptions {
  title: string;
  message?: string;
  titleIcon?: string;
  acceptLabel?: string;
  cancelLabel?: string;
  acceptVariant?: ButtonVariant;
  size?: ModalSize;
}

export interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  confirmDelete: (itemName?: string, options?: Partial<ConfirmOptions>) => Promise<boolean>;
  confirmDiscard: (options?: Partial<ConfirmOptions>) => Promise<boolean>;
}

export interface ConfirmProviderProps {
  children: ReactNode;
}
