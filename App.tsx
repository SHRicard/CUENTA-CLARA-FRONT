import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SafeLayout } from './src/layout';
import { ThemeProvider, useTheme } from './src/theme';

const Content = () => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: theme.colors.text, fontSize: theme.fontSize.md }}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultPalette="ocean" defaultMode="system">
        <SafeLayout>
          <Content />
        </SafeLayout>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
