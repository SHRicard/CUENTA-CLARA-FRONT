import { Platform } from 'react-native';

import { ColorScheme } from '../../interface';

const STYLE_ID = 'app-custom-scrollbar';

export const injectWebScrollbar = (colors: ColorScheme) => {
  if (Platform.OS !== 'web') return;
  if (typeof document === 'undefined') return;

  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: ${colors.surface};
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.primary};
      border-radius: 8px;
      border: 2px solid ${colors.surface};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.secondary};
    }
    ::-webkit-scrollbar-corner {
      background: ${colors.surface};
    }
    * {
      scrollbar-color: ${colors.primary} ${colors.surface};
      scrollbar-width: thin;
    }
  `;
};
