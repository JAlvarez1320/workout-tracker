import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export function TopBar() {
  const router = useRouter();

  return (
    <View style={styles.topBar}>
      {/* //Leave the left side empty so the settings is pushed to the right */}
      <View />

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push('/settings')}
      >
        <Ionicons name="settings-outline" size={24} color="#111827" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
});