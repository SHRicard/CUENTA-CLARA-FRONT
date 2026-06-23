import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { KeyboardAwareLayoutProps } from '../../interface';

export const KeyboardAwareLayout = ({
  children,
  contentContainerStyle,
  keyboardVerticalOffset = 0,
}: KeyboardAwareLayoutProps) => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'web') {
    return <>{children}</>;
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: 'center' },
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
