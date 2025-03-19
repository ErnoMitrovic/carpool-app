import { darkTheme, lightTheme } from "@/components/ui/CarpoolTheme";
import { AuthProvider, useAuth } from "@/store/AuthContext";
import { useFonts } from "expo-font";
import { Redirect, Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoaded) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (isSignedIn && inAuthGroup) {
      // Redirect to app if user is signed in and in auth group
      router.replace('/(app)');
    } else if (!isSignedIn && !inAuthGroup) {
      // Redirect to auth if user is not signed in and not in auth group
      router.replace('/(auth)/login');
    }
  }, [isSignedIn, segments, isLoaded]);
  
  return <Slot />;
}

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
          <RootLayoutNav />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;