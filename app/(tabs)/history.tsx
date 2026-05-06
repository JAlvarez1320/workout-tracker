import { Image } from 'expo-image';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

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

export default function HistoryScreen() {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);

  useEffect(() => {
    let unsubscribeLogs: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLogs([]);
        return;
      }

      const logsRef = ref(db, `users/${user.uid}/exerciseLogs`);

      unsubscribeLogs = onValue(logsRef, (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setLogs([]);
          return;
        }

        const logsArray: ExerciseLog[] = Object.keys(data).map((key) => ({
          logID: key,
          ...data[key],
        }));

        setLogs(logsArray.reverse());
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeLogs) unsubscribeLogs();
    };
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
          <ThemedText style={styles.pageTitle}>Workout History</ThemedText>

          <ThemedText style={styles.pageSubtitle}>
            Review your completed workout logs
          </ThemedText>
        </View>

        {logs.length === 0 ? (
          <View style={styles.emptyCard}>
            <ThemedText style={styles.emptyText}>
              No workout history yet.
            </ThemedText>
          </View>
        ) : (
          logs.map((log) => (
            <Collapsible
              key={log.logID}
              title={formatDate(log.date)}
              subtitle={log.exerName}
              time={`${log.time?.minutes ?? 0}m ${log.time?.seconds ?? 0}s`}
              pr={`${log.weight ?? 'N/A'} lbs`}
            >
              <View style={styles.statBox}>
                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Exercise</ThemedText>
                  <ThemedText style={styles.statValue}>{log.exerName}</ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Date</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {formatDate(log.date)}
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Sets</ThemedText>
                  <ThemedText style={styles.statValue}>{log.sets}</ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Reps</ThemedText>
                  <ThemedText style={styles.statValue}>{log.reps}</ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Weight</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {log.weight ?? 'N/A'} lbs
                  </ThemedText>
                </View>

                <View style={styles.statRow}>
                  <ThemedText style={styles.statLabel}>Time</ThemedText>
                  <ThemedText style={styles.statValue}>
                    {log.time?.minutes ?? 0} min {log.time?.seconds ?? 0} sec
                  </ThemedText>
                </View>
              </View>
            </Collapsible>
          ))
        )}
      </ParallaxScrollView>
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
});