import { View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

import { ModalProps, ModalSize } from '../../../interface';
import { useTheme } from '../../../theme';
import { Button } from '../button';

const MAX_WIDTH: Record<ModalSize, number> = {
  sm: 320,
  md: 480,
  lg: 640,
};

export const Modal = ({
  visible,
  onDismiss,
  size = 'md',
  title,
  titleIcon,
  acceptLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  onAccept,
  onCancel,
  acceptLoading = false,
  acceptDisabled = false,
  acceptVariant = 'primary',
  children,
}: ModalProps) => {
  const { theme } = useTheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          maxWidth: MAX_WIDTH[size],
          width: '90%',
          alignSelf: 'center',
          borderRadius: theme.radius.lg,
        }}
      >
        {titleIcon && <Dialog.Icon icon={titleIcon} size={32} />}
        <Dialog.Title style={{ textAlign: 'center' }}>{title}</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
            }}
          >
            {children}
          </View>
        </Dialog.Content>
        <Dialog.Actions
          style={{
            justifyContent: 'center',
            gap: theme.spacing.sm,
            paddingHorizontal: theme.spacing.md,
            paddingBottom: theme.spacing.sm,
          }}
        >
          <Button variant="ghost" onPress={onCancel ?? onDismiss}>
            {cancelLabel}
          </Button>
          <Button
            variant={acceptVariant}
            onPress={onAccept}
            loading={acceptLoading}
            disabled={acceptDisabled}
          >
            {acceptLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
