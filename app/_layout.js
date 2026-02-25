import { Stack } from "expo-router";
import { AuthProvider } from "./context/auth_context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
