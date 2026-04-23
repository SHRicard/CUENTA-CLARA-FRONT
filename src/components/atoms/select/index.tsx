import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { HelperText, Menu, TextInput } from 'react-native-paper';

import { SelectProps } from '../../../interface';

export const Select = <T extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  options,
  disabled,
  helperText,
}: SelectProps<T>) => {
  const [visible, setVisible] = useState(false);
  const [anchorWidth, setAnchorWidth] = useState(0);

  const onAnchorLayout = (e: LayoutChangeEvent) => {
    setAnchorWidth(e.nativeEvent.layout.width);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
        const selected = options.find((o) => o.value === value);

        return (
          <View>
            <View onLayout={onAnchorLayout}>
              <Menu
                visible={visible}
                onDismiss={() => {
                  setVisible(false);
                  onBlur();
                }}
                anchorPosition="bottom"
                contentStyle={anchorWidth ? { width: anchorWidth, maxHeight: 320 } : undefined}
                anchor={
                  <Pressable onPress={() => !disabled && setVisible(true)}>
                    <TextInput
                      label={label}
                      placeholder={placeholder}
                      value={selected?.label ?? ''}
                      editable={false}
                      pointerEvents="none"
                      disabled={disabled}
                      error={!!error}
                      right={<TextInput.Icon icon={visible ? 'menu-up' : 'menu-down'} />}
                    />
                  </Pressable>
                }
              >
                {options.map((opt) => (
                  <Menu.Item
                    key={opt.value}
                    title={opt.label}
                    onPress={() => {
                      onChange(opt.value);
                      setVisible(false);
                    }}
                    trailingIcon={opt.value === value ? 'check' : undefined}
                  />
                ))}
              </Menu>
            </View>
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
