import { View } from 'react-native';

import LogoHorizontalDark from '../../../../assets/Logo-horizontal-dark.svg';
import LogoHorizontalLight from '../../../../assets/Logo-horizonta-light.svg';
import { useTheme } from '../../../theme';
import { LogoVariant } from '../logo';

export interface LogoHorizontalProps {
  variant?: LogoVariant;
}

const ASPECT_RATIO = 370 / 89.92;

export const LogoHorizontal = ({ variant = 'auto' }: LogoHorizontalProps) => {
  const { theme } = useTheme();

  const useLight = variant === 'auto' ? theme.isDark : variant === 'light';
  const Svg = useLight ? LogoHorizontalDark : LogoHorizontalLight;

  return (
    <View style={{ width: '100%', aspectRatio: ASPECT_RATIO }}>
      <Svg width="100%" height="100%" />
    </View>
  );
};
