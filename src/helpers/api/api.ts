import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { isDev } from '../env/env';

const API_PORT = process.env.EXPO_PUBLIC_API_PORT ?? '3030';
const API_PREFIX = process.env.EXPO_PUBLIC_API_PREFIX ?? '';

export const getApiUrl = (): string => {
  if (!isDev()) {
    return (process.env.EXPO_PUBLIC_API_URL_PROD ?? '') + API_PREFIX;
  }

  if (Platform.OS === 'web') {
    return `http://127.0.0.1:${API_PORT}${API_PREFIX}`;
  }

  // Dispositivo físico: extrae la IP del host de Metro (LAN del PC de desarrollo)
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return `http://${ip}:${API_PORT}${API_PREFIX}`;
    }
  }

  console.warn(
    '⚠️ No se pudo detectar la IP del servidor. ' +
      'El dispositivo físico no puede alcanzar 127.0.0.1 del PC. ' +
      'Revisa que Metro esté corriendo.',
  );
  return `http://127.0.0.1:${API_PORT}${API_PREFIX}`;
};
