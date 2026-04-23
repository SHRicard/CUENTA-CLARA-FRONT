import { useContext } from 'react';

import { ConfirmContextValue } from '../../interface';
import { ConfirmContext } from '../confirmProvider/ConfirmProvider';

export const useConfirm = (): ConfirmContextValue => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return ctx;
};
