import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { PasswordFieldProps } from '../../../interface';

export const PasswordField = <T extends FieldValues>({
  control,
  name,
  rules,
  helperText,
  ...rest
}: PasswordFieldProps<T>) => {
  const [visible, setVisible] = useState(false);

  return (
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
            autoCapitalize="none"
            autoCorrect={false}
            {...rest}
            secureTextEntry={!visible}
            right={
              <TextInput.Icon
                icon={visible ? 'eye-off' : 'eye'}
                onPress={() => setVisible((v) => !v)}
                forceTextInputFocus={false}
              />
            }
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
};
