import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '../../components/themed-text';
import { useAuth } from '../../context/auth_context';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View style={styles.screen}>

      {/* TOP CONTENT */}
      <View style={styles.content}>

        {/* SETTINGS CARD */}
        <View style={styles.card}>

          {/* Clear Data */}
          <TouchableOpacity style={styles.settingRow}>
            <View>
              <ThemedText style={styles.settingTitle}>Clear All Data</ThemedText>
              <ThemedText style={styles.settingSubtitle}>
                Remove saved workouts and history
              </ThemedText>
            </View>
            <Ionicons name="trash-outline" size={22} color="#DC2626" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* About */}
          <TouchableOpacity style={styles.settingRow}>
            <View>
              <ThemedText style={styles.settingTitle}>About</ThemedText>
              <ThemedText style={styles.settingSubtitle}>
                A simple workout tracking app
              </ThemedText>
            </View>
            <Ionicons name="information-circle-outline" size={22} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Version */}
          <View style={styles.settingRow}>
            <View>
              <ThemedText style={styles.settingTitle}>App Version</ThemedText>
              <ThemedText style={styles.settingSubtitle}>Version 1.0.0</ThemedText>
            </View>
          </View>

        </View>
      </View>

      {/* BOTTOM SECTION */}
      <View style={styles.bottomSection}>

        {/* Profile */}
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={20} color="#FFFFFF" />
            </View>

            <View>
              <ThemedText style={styles.settingTitle}>Profile</ThemedText>
              <ThemedText style={styles.settingSubtitle}>
                View and edit your profile
              </ThemedText>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={logout}>
          <ThemedText style={styles.signOutText}>Logout</ThemedText>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingRow: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  bottomSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    marginTop: 12,
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
