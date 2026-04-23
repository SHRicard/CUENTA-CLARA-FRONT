import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SafeLayout } from './src/layout';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeLayout>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </SafeLayout>
    </SafeAreaProvider>
  );
}
