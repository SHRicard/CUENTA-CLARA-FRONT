import { BrandLogo } from '../../../const';

export type LogoSize = 'sm' | 'md' | 'lg';
export type LogoVariant = 'auto' | 'light' | 'dark';

export interface LogoProps {
  size?: LogoSize;
  /** Se mantiene por compatibilidad; no cambia el asset. */
  variant?: LogoVariant;
}

const SIZES: Record<LogoSize, number> = {
  sm: 80,
  md: 160,
  lg: 240,
};

export const LogoSvg = ({ size = 'md' }: LogoProps) => {
  const dimension = SIZES[size];

  return <BrandLogo width={dimension} height={dimension} />;
};
