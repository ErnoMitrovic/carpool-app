import { darkTheme, lightTheme } from "@/components/ui/CarpoolTheme";
import { AuthProvider } from "@/store/AuthContext";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
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
      <AuthProvider>
        <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <Slot />
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;