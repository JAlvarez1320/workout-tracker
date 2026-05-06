import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/auth_context";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/(app)/home"); // maps to (app)/home.js
      } else {
        router.replace('/(auth)/login'); // maps to (auth)/login
      }
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )
}