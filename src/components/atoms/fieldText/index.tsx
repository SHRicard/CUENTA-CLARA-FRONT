import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { FieldTextProps } from '../../../interface';

export const FieldText = <T extends FieldValues>({
  control,
  name,
  rules,
  helperText,
  ...rest
}: FieldTextProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <View>
        <TextInput
          value={value ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          error={!!error}
          {...rest}
        />
        {(error?.message || helperText) && (
          <HelperText type={error ? 'error' : 'info'} visible>
            {error?.message ?? helperText}
          </HelperText>
        )}
      </View>
    )}
  />
);
