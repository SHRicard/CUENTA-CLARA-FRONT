import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import { DatePickerProps } from '../../../interface';

const formatDate = (d: Date | null | undefined) => {
  if (!d) return '';
  return d.toLocaleDateString();
};

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  disabled,
  helperText,
  locale = 'en',
}: DatePickerProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const raw = value as unknown;
        const date = raw instanceof Date ? raw : undefined;

        const onConfirm = (params: { date: Date | undefined }) => {
          setOpen(false);
          onChange(params.date ?? null);
        };

        return (
          <View>
            <Pressable
              onPress={() => {
                if (!disabled) setOpen(true);
              }}
              onBlur={onBlur}
            >
              <TextInput
                label={label}
                value={formatDate(date)}
                editable={false}
                pointerEvents="none"
                disabled={disabled}
                error={!!error}
                right={<TextInput.Icon icon="calendar" />}
              />
            </Pressable>

            <DatePickerModal
              locale={locale}
              mode="single"
              visible={open}
              onDismiss={() => setOpen(false)}
              date={date}
              onConfirm={onConfirm}
            />

            {(error?.message || helperText) && (
              <HelperText type={error ? 'error' : 'info'} visible>
                {error?.message ?? helperText}
              </HelperText>
            )}
          </View>
        );
      }}
    />
  );
};
