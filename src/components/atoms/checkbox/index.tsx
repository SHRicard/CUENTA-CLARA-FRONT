import { Controller, FieldValues } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { Checkbox as PaperCheckbox, HelperText, Text } from 'react-native-paper';

import { CheckboxProps } from '../../../interface';
import { useTheme } from '../../../theme';

export const Checkbox = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  disabled,
  helperText,
}: CheckboxProps<T>) => {
  const { theme } = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View>
          <Pressable
            onPress={() => !disabled && onChange(!value)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}
          >
            <PaperCheckbox
              status={value ? 'checked' : 'unchecked'}
              disabled={disabled}
              onPress={() => !disabled && onChange(!value)}
            />
            {label && (
              <Text
                variant="bodyMedium"
                style={{
                  color: disabled ? theme.colors.textMuted : theme.colors.text,
                  flex: 1,
                }}
              >
                {label}
              </Text>
            )}
          </Pressable>
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
