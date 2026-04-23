import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { buildNavTheme, buildPaperTheme } from './src/helpers';
import { useAppFonts } from './src/hooks';
import { RootNavigator } from './src/router';
import { persistor, store } from './src/store';
import { ThemeProvider, useTheme } from './src/theme';

SplashScreen.preventAutoHideAsync();

const ThemedShell = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const paperTheme = buildPaperTheme(theme.colors, theme.mode);
  const navTheme = buildNavTheme(theme.colors, theme.mode);

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={navTheme}>{children}</NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  const [fontsLoaded, fontsError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <ThemeProvider defaultPalette="ocean" defaultMode="system">
              <ThemedShell>
                <RootNavigator />
              </ThemedShell>
            </ThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </StoreProvider>
  );
}
