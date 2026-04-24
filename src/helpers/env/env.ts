export const getTypeDeploy = (): string => {
  return process.env.EXPO_PUBLIC_TYPE_DEPLOY ?? 'production';
};

export const isDev = (): boolean => {
  return getTypeDeploy() === 'development';
};
