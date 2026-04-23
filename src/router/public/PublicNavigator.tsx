import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PublicStackParamList } from '../../interface';
import { Login } from '../../screen/(public)/login/Login';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);
