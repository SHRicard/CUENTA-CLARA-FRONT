import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PublicStackParamList } from '../../interface';
import { KeyboardAwareLayout } from '../../layout';
import { ForgotPassword } from '../../screen/(public)/forgotPassword/ForgotPassword';
import { Login } from '../../screen/(public)/login/Login';
import { Register } from '../../screen/(public)/register/Register';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    screenLayout={({ children }) => <KeyboardAwareLayout>{children}</KeyboardAwareLayout>}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);
