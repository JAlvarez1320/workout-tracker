import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/auth_context';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.name || 'User'}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  )
}
