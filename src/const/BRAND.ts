import { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';

import CuentaClara from '../../assets/CUENTA-CLARA.svg';

// Logo de la marca (SVG). Punto único: cambiá este import y el logo
// cambia en toda la app (LogoSvg, LogoHorizontal, etc.).
export const BrandLogo: FC<SvgProps> = CuentaClara;

// Logo de la marca (PNG). Es una "source" para <Image> (lo usa LogoPng).
export const BrandLogoPng: ImageSourcePropType = require('../../assets/CUENTA-CLARA.png');
