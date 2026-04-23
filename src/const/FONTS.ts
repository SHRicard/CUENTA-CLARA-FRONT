import { Fonts } from '../interface';

export const FONTS = {
  inter: {
    thin: 'Inter_100Thin',
    extraLight: 'Inter_200ExtraLight',
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    extraBold: 'Inter_800ExtraBold',
    black: 'Inter_900Black',
  },
  quicksand: {
    light: 'Quicksand_300Light',
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    semibold: 'Quicksand_600SemiBold',
    bold: 'Quicksand_700Bold',
  },
  lato: {
    thin: 'Lato_100Thin',
    thinItalic: 'Lato_100Thin_Italic',
    light: 'Lato_300Light',
    lightItalic: 'Lato_300Light_Italic',
    regular: 'Lato_400Regular',
    italic: 'Lato_400Regular_Italic',
    bold: 'Lato_700Bold',
    boldItalic: 'Lato_700Bold_Italic',
    black: 'Lato_900Black',
    blackItalic: 'Lato_900Black_Italic',
  },
} as const satisfies Fonts;
