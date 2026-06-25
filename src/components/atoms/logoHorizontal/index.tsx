import { View } from 'react-native';

import { BrandLogo } from '../../../const';
import { LogoVariant } from '../LogoSvg';

export interface LogoHorizontalProps {
  /** Se mantiene por compatibilidad; el logo de marca es único. */
  variant?: LogoVariant;
}

// El asset de marca actual es cuadrado (no hay versión horizontal).
// Se renderiza centrado a ancho completo. Si más adelante agregás un
// logo apaisado, registralo en BRAND y ajustá este tamaño.
export const LogoHorizontal = (_props: LogoHorizontalProps) => {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <BrandLogo width={180} height={180} />
    </View>
  );
};
