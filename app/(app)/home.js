import { useRouter } from "expo-router";
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/auth_context';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.name}!</Text>
      <Button
        title="Add Workout Log"
        onPress={() => router.push("/(app)/addLog")}
      />
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  )
}
