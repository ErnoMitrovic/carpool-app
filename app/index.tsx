import { Redirect } from "expo-router";

export default function Page() {
  // Redirect immediately to the auth login page
  return <Redirect href="/(auth)/login" />;
}
