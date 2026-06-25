import { Image } from 'react-native';

import { BrandLogoPng } from '../../../const';
import { LogoProps, LogoSize } from '../LogoSvg';

const SIZES: Record<LogoSize, number> = {
  sm: 80,
  md: 160,
  lg: 240,
};

export const LogoPng = ({ size = 'md' }: LogoProps) => {
  const dimension = SIZES[size];

  return (
    <Image
      source={BrandLogoPng}
      style={{ width: dimension, height: dimension }}
      resizeMode="contain"
    />
  );
};
