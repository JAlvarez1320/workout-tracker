import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../services/firebase';
import { ref, onValue } from 'firebase/database';

export default function HistoryScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const logsRef = ref(db, `users/${user.uid}/exerciseLogs`);

    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const logsArray = Object.values(data);
        setLogs(logsArray.reverse());
      } else {
        setLogs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      <FlatList
        data={logs}
        keyExtractor={(item) => item.logID}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.exerName}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Sets: {item.sets}</Text>
            <Text>Reps: {item.reps}</Text>
            <Text>Weight: {item.weight}</Text>
            <Text>
              Time: {item.time.minutes}m {item.time.seconds}s
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  card: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  name: { fontWeight: 'bold' },
});