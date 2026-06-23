import LogoBlack from '../../../../assets/logo-ojo-super-black.svg';
import LogoLight from '../../../../assets/logo-ojo-super-light.svg';
import { useTheme } from '../../../theme';

export type LogoSize = 'sm' | 'md' | 'lg';
export type LogoVariant = 'auto' | 'light' | 'dark';

export interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
}

const SIZES: Record<LogoSize, number> = {
  sm: 80,
  md: 160,
  lg: 240,
};

export const Logo = ({ size = 'md', variant = 'auto' }: LogoProps) => {
  const { theme } = useTheme();

  const useLight = variant === 'auto' ? theme.isDark : variant === 'light';
  const Svg = useLight ? LogoLight : LogoBlack;
  const dimension = SIZES[size];

  return <Svg width={dimension} height={dimension} />;
};
