import { darkTheme, lightTheme } from "@/components/ui/CarpoolTheme";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import { useFonts } from "expo-font";
import { Redirect, Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;