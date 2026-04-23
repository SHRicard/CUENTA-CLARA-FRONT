import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { Text } from 'react-native-paper';

import { Modal } from '../../components';
import { ConfirmContextValue, ConfirmOptions, ConfirmProviderProps } from '../../interface';
import { useTheme } from '../../theme';

export const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export const ConfirmProvider = ({ children }: ConfirmProviderProps) => {
  const { theme } = useTheme();
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const close = useCallback((result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setOptions(null);
  }, []);

  const confirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setOptions(opts);
    });
  }, []);

  const confirmDelete = useCallback(
    (itemName?: string, extra?: Partial<ConfirmOptions>) =>
      confirm({
        title: '¿Eliminar?',
        message: itemName
          ? `¿Seguro que querés eliminar "${itemName}"? Esta acción no se puede deshacer.`
          : 'Esta acción no se puede deshacer.',
        titleIcon: 'alert-circle',
        acceptLabel: 'Eliminar',
        acceptVariant: 'danger',
        size: 'sm',
        ...extra,
      }),
    [confirm],
  );

  const confirmDiscard = useCallback(
    (extra?: Partial<ConfirmOptions>) =>
      confirm({
        title: '¿Descartar cambios?',
        message: 'Se perderán los cambios no guardados.',
        titleIcon: 'content-save-off',
        acceptLabel: 'Descartar',
        acceptVariant: 'danger',
        size: 'sm',
        ...extra,
      }),
    [confirm],
  );

  const value = useMemo<ConfirmContextValue>(
    () => ({ confirm, confirmDelete, confirmDiscard }),
    [confirm, confirmDelete, confirmDiscard],
  );

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <Modal
        visible={options !== null}
        onDismiss={() => close(false)}
        size={options?.size}
        title={options?.title ?? ''}
        titleIcon={options?.titleIcon}
        acceptLabel={options?.acceptLabel}
        cancelLabel={options?.cancelLabel}
        acceptVariant={options?.acceptVariant}
        onAccept={() => close(true)}
        onCancel={() => close(false)}
      >
        {options?.message ? (
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.text, textAlign: 'center' }}
          >
            {options.message}
          </Text>
        ) : null}
      </Modal>
    </ConfirmContext.Provider>
  );
};
