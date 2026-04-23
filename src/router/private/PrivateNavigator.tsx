import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { PrivateTabParamList } from '../../interface';
import { Dashboard } from '../../screen/(private)/dashboard/Dashboard';
import { Profile } from '../../screen/(private)/profile/Profile';
import { Settings } from '../../screen/(private)/settings/Settings';

const Tab = createBottomTabNavigator<PrivateTabParamList>();

export const PrivateNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
