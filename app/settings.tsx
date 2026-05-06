import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { ref, remove, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/context/auth_context';
import { auth, db } from '@/services/firebase';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const initialName =
    user?.name || auth.currentUser?.displayName || 'No name set';

  const [name, setName] = useState(initialName);
  const [tempName, setTempName] = useState(
    initialName === 'No name set' ? '' : initialName
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    const currentName =
      user?.name || auth.currentUser?.displayName || 'No name set';

    setName(currentName);
    setTempName(currentName === 'No name set' ? '' : currentName);
  }, [user]);

  const clearWorkoutData = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log('No user is currently logged in.');
      return;
    }

    try {
      await remove(ref(db, `users/${currentUser.uid}/exerciseLogs`));
      console.log('Workout data cleared successfully.');
    } catch (error) {
      console.log('Error clearing workout data:', error);
    }
  };

  const handleClearAllData = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete all saved workouts and history? This cannot be undone.'
      );

      if (confirmed) {
        clearWorkoutData();
      }

      return;
    }

    Alert.alert(
      'Clear All Data',
      'Are you sure you want to delete all saved workouts and history? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearWorkoutData,
        },
      ]
    );
  };

  const handleSaveName = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;
    if (!tempName.trim()) return;

    const newName = tempName.trim();

    await updateProfile(currentUser, {
      displayName: newName,
    });

    await update(ref(db, `users/${currentUser.uid}/profile`), {
      name: newName,
      email: currentUser.email,
      updatedAt: Date.now(),
    });

    setName(newName);
    setTempName(newName);
    setIsEditingProfile(false);
  };

  const handleSignOut = async () => {
    await logout();
    router.replace('/login' as any);
  };

  return (
    <View style={styles.screen}>
      {/* TOP CONTENT */}
      <View style={styles.content}>
        {/* SETTINGS CARD */}
        <View style={styles.card}>
          {/* Clear Data */}
          <TouchableOpacity style={styles.settingRow} onPress={handleClearAllData}>
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
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#6B7280"
            />
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
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={20} color="#FFFFFF" />
              </View>

              <View>
                <ThemedText style={styles.settingTitle}>Profile</ThemedText>
                <ThemedText style={styles.settingSubtitle}>
                  {isEditingProfile ? 'Edit your name' : name}
                </ThemedText>
              </View>
            </View>

            {!isEditingProfile && (
              <TouchableOpacity onPress={() => setIsEditingProfile(true)}>
                <ThemedText style={styles.editText}>Edit</ThemedText>
              </TouchableOpacity>
            )}
          </View>

          {isEditingProfile && (
            <View style={styles.editProfileBox}>
              <TextInput
                placeholder="Enter your name"
                value={tempName}
                onChangeText={setTempName}
                style={styles.input}
              />

              <View style={styles.editButtonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setTempName(name === 'No name set' ? '' : name);
                    setIsEditingProfile(false);
                  }}
                >
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
                  <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'space-between',
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  editText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
  editProfileBox: {
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  editButtonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#111827',
    fontWeight: '700',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
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
    fontWeight: '700',
  },
});