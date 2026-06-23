import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE, Language, setLanguage, SUPPORTED_LANGUAGES } from './i18n';

/**
 * Hook para leer y cambiar el idioma activo desde la UI (ej. selector en Ajustes).
 * El idioma se normaliza a su código base ('en-US' -> 'en').
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();
  const base = i18n.language?.split('-')[0];
  const language: Language = (SUPPORTED_LANGUAGES as readonly string[]).includes(base)
    ? (base as Language)
    : DEFAULT_LANGUAGE;

  return {
    language,
    setLanguage,
    languages: SUPPORTED_LANGUAGES,
  };
};
