import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  onPress?: () => void;
  children: ReactNode;
}

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  outline?: boolean;
  dot?: boolean;
  children?: ReactNode;
}

export type CardVariant = 'elevated' | 'filled' | 'outlined';
export type CardPadding = 'sm' | 'md' | 'lg';

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  rightIcon?: string;
  cover?: string;
  coverAspectRatio?: number;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  actions?: ReactNode;
  children?: ReactNode;
}

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  size?: ModalSize;
  title: string;
  titleIcon?: string;
  acceptLabel?: string;
  cancelLabel?: string;
  onAccept: () => void;
  onCancel?: () => void;
  acceptLoading?: boolean;
  acceptDisabled?: boolean;
  acceptVariant?: ButtonVariant;
  children: ReactNode;
}
