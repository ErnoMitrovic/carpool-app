import { darkTheme, lightTheme } from "@/components/ui/CarpoolTheme";
import { SignUp } from "@/screens/SignUp";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
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
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>);
}

export default RootLayout;