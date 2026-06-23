import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from '../../../theme';

export interface PasswordStrengthProps {
  password: string;
}

const TOTAL_SEGMENTS = 3;

const calcStrength = (password: string) => {
  const rules = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  return rules.filter(Boolean).length;
};

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const { theme } = useTheme();

  if (!password) return null;

  const score = calcStrength(password);

  let segments: number;
  let label: string;
  let color: string;

  if (score <= 2) {
    segments = 1;
    label = 'Débil';
    color = theme.colors.error;
  } else if (score === 3) {
    segments = 2;
    label = 'Media';
    color = theme.colors.warning;
  } else {
    segments = 3;
    label = 'Fuerte';
    color = theme.colors.success;
  }

  return (
    <View style={{ gap: theme.spacing.xs }}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              backgroundColor: i < segments ? color : theme.colors.border,
            }}
          />
        ))}
      </View>
      <Text variant="bodySmall" style={{ color }}>
        Contraseña {label.toLowerCase()}
      </Text>
    </View>
  );
};
