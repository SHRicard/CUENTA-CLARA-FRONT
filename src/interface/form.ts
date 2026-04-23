import { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native-paper';

type BaseControlledProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
  >;
  helperText?: string;
};

export type FieldTextProps<T extends FieldValues = FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'error'
> &
  BaseControlledProps<T>;

export type CheckboxProps<T extends FieldValues = FieldValues> = BaseControlledProps<T> & {
  label?: string;
  disabled?: boolean;
};

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectProps<T extends FieldValues = FieldValues> = BaseControlledProps<T> & {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
};

export type DatePickerMode = 'single' | 'range';

export type DatePickerProps<T extends FieldValues = FieldValues> = BaseControlledProps<T> & {
  label?: string;
  disabled?: boolean;
  locale?: string;
};
