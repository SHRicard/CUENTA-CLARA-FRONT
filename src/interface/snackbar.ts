import { ReactNode } from 'react';

export type SnackbarVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface SnackbarAction {
  label: string;
  onPress: () => void;
}

export interface SnackbarOptions {
  message: string;
  variant?: SnackbarVariant;
  duration?: number;
  action?: SnackbarAction;
  icon?: string;
}

export interface SnackbarContextValue {
  show: (options: SnackbarOptions) => void;
  showSuccess: (message: string, options?: Partial<SnackbarOptions>) => void;
  showError: (message: string, options?: Partial<SnackbarOptions>) => void;
  showWarning: (message: string, options?: Partial<SnackbarOptions>) => void;
  showInfo: (message: string, options?: Partial<SnackbarOptions>) => void;
  hide: () => void;
}

export interface SnackbarProviderProps {
  children: ReactNode;
}
