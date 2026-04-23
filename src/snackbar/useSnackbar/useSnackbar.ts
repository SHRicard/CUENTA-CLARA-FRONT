import { useContext } from 'react';

import { SnackbarContextValue } from '../../interface';
import { SnackbarContext } from '../snackbarProvider/SnackbarProvider';

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return ctx;
};
