import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { Collapsible } from '@/components/ui/collapsible';
import { TopBar } from '@/components/ui/top-bar';
import { auth, db } from '@/services/firebase';

type ExerciseLog = {
  logID: string;
  exerName: string;
  sets: number;
  reps: number;
  weight?: number;
  date: string;
  time?: {
    minutes: number;
    seconds: number;
  };
};

function formatDate(dateString: string) {
  if (!dateString) return 'No date';

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomeScreen() {
  const router = useRouter();
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setExerciseLogs([]);
      return;
    }

    const logsRef = ref(db, `users/${user.uid}/exerciseLogs`);

    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setExerciseLogs([]);
        return;
      }

      const logsArray: ExerciseLog[] = Object.keys(data).map((key) => ({
        logID: key,
        ...data[key],
      }));

      setExerciseLogs(logsArray.reverse());
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screen}>
      <TopBar />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <View style={styles.headerContainer}>
            <Image
              source={require('@/assets/images/blurred-gym.jpg')}
              style={styles.bigGymHeader}
              contentFit="cover"
            />

            <View style={styles.overlay} />

            <Image
              source={require('@/assets/images/lift-logo.png')}
              style={styles.headerLogo}
              contentFit="contain"
              tintColor="#E5E7EB"
            />
          </View>
        }
      >
        <View style={styles.pageHeader}>
          <ThemedText style={styles.welcomeText}>
            Welcome, {auth.currentUser?.displayName || 'User'}!
          </ThemedText>

          <ThemedText style={styles.pageTitle}>Workout Logs</ThemedText>

          <ThemedText style={styles.pageSubtitle}>
            Track your saved exercises and personal records
          </ThemedText>
        </View>

        {exerciseLogs.length === 0 ? (
          <View style={styles.emptyCard}>
            <ThemedText style={styles.emptyText}>
              No workouts yet. Add your first workout below.
            </ThemedText>
          </View>
        ) : (
          exerciseLogs.map((workout) => (
            <Collapsible
              key={workout.logID}
              title={workout.exerName}
              subtitle={formatDate(workout.date)}
              time={`${workout.time?.minutes ?? 0}m ${workout.time?.seconds ?? 0}s`}
              pr={`${workout.weight ?? 'N/A'} lbs`}
            >
              <View style={styles.statBox}>
                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Exercise</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {workout.exerName}
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Date</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {formatDate(workout.date)}
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Sets</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {workout.sets}
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Reps</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {workout.reps}
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Weight</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {workout.weight ?? 'N/A'} lbs
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Time</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {workout.time?.minutes ?? 0} min{' '}
                    {workout.time?.seconds ?? 0} sec
                  </ThemedText>
                </View>
              </View>
            </Collapsible>
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ParallaxScrollView>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/addLog' as any)}
        >
          <ThemedText style={styles.addButtonText}>+ Add Workout</ThemedText>
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
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  bigGymHeader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  headerLogo: {
    position: 'absolute',
    top: '3%',
    alignSelf: 'center',
    width: 660,
    height: 260,
    opacity: 0.9,
  },
  pageHeader: {
    marginBottom: 22,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
  },
  statBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  bottomSpacer: {
    height: 120,
  },
  bottomButtonContainer: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});