import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../../interface';
import { RootState } from '../../store/store';
import { PrivateNavigator } from '../private/PrivateNavigator';
import { PublicNavigator } from '../public/PublicNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Private" component={PrivateNavigator} />
      ) : (
        <Stack.Screen name="Public" component={PublicNavigator} />
      )}
    </Stack.Navigator>
  );
};
