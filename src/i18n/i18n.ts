/* eslint-disable import/no-named-as-default-member -- patrón canónico de i18next: se usa la instancia default (i18n.use/changeLanguage) */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

export const LANGUAGE_KEY = '@app/lang';
export const SUPPORTED_LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'es';

const isSupported = (code?: string | null): code is Language =>
  !!code && (SUPPORTED_LANGUAGES as readonly string[]).includes(code);

const getDeviceLanguage = (): Language => {
  const code = Localization.getLocales()[0]?.languageCode;
  return isSupported(code) ? code : DEFAULT_LANGUAGE;
};

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getDeviceLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  interpolation: { escapeValue: false },
});

/**
 * Aplica el idioma elegido manualmente (persistido en AsyncStorage) si existe.
 * Llamar una vez al arrancar la app; si no hay override, queda el idioma del dispositivo.
 */
export const loadPersistedLanguage = async (): Promise<void> => {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (isSupported(saved) && saved !== i18n.language) {
      await i18n.changeLanguage(saved);
    }
  } catch {
    // si falla la lectura, se mantiene el idioma del dispositivo
  }
};

/** Cambia el idioma y lo persiste como override manual. */
export const setLanguage = async (lng: Language): Promise<void> => {
  await i18n.changeLanguage(lng);
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
  } catch {
    // noop: el cambio ya se aplicó en memoria aunque no se haya podido persistir
  }
};

export default i18n;
