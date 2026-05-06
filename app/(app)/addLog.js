import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';
import { addWorkoutLog } from '../../services/workoutService';
import { useRouter } from 'expo-router';

export default function AddLogScreen() {
  const [exerName, setExerName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [message, setMessage] = useState('');
  const [currentExercises, setCurrentExercises] = useState([]);
  const [showLog, setShowLog] = useState(true);
  const router = useRouter();

  const handleSaveWorkout = async () => {
    if (!exerName || !sets || !reps) {            // Validate user input
      setMessage('Please fill in Exercise Name, Sets, Weight, and Reps. Minutes and Seconds are optional.');
      return;
    }

    if (!Number.isInteger(Number(sets)) || Number(sets) <= 0) {     // Validate user input
      setMessage('Sets must be a positive integer');
      return;
    }

    if (!Number.isInteger(Number(reps)) || Number(reps) <= 0) {     // Validate user input
      setMessage('Reps must be a positive integer');
      return;
    }

    try {      
      // Waits until Firebase finishes saving log
      const savedLog = await addWorkoutLog({ 
        date: new Date().toISOString().split('T')[0],           // Takes current data and converts to string, splits at T ("2026-05-04T21:30:00.000Z") to (2026-05-04)
        exerName,
        exerID: exerName.toLowerCase().replace(/\s+/g, '_'),    // Convert spaces to (_), converts str to lower case
        sets,
        reps,
        weight,
        minutes,
        seconds,
      });

      setMessage('Workout saved!');   // Verify saved workout

      setCurrentExercises((prevExercises) => [
        ...prevExercises,
        savedLog
      ]);

      // Clear inputs
      setExerName('');
      setSets('');
      setReps('');
      setWeight('');
      setMinutes('');
      setSeconds('');
    }
    catch (error) {
      console.log('Error saving workout:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Workout</Text>

      <TextInput
        placeholder="Exercise Name"
        value={exerName}
        onChangeText={setExerName}
        style={styles.input}
      />

      <TextInput
        placeholder="Sets"
        value={sets}
        onChangeText={(text) => setSets(text.replace(/[^0-9]/g, ''))}     // Validate user input
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Reps"
        value={reps}
        onChangeText={(text) => setReps(text.replace(/[^0-9]/g, ''))}     // Validate user input
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Weight"
        value={weight}
        onChangeText={(text) => setWeight(text.replace(/[^0-9]/g, ''))}     // Validate user input
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Minutes"
        value={minutes}
        onChangeText={(text) => setMinutes(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Seconds"
        value={seconds}
        onChangeText={(text) => setSeconds(text.replace(/[^0-9]/g, ''))}
        keyboardType="numeric"
        style={styles.input}
      />
      
      <Text style={styles.subtitle}>Current Workout Log</Text>
      <Button
        title={showLog ? "Hide" : "Show"}
        onPress={() => setShowLog(!showLog)}
      />
      
      {showLog && (
        <FlatList
         data={currentExercises}
          keyExtractor={(item) => item.logID}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.exerciseName}>{item.exerName}</Text>
              <Text>Sets: {item.sets}</Text>
              <Text>Reps: {item.reps}</Text>
              <Text>Weight: {item.weight}<Text>
              </Text>Time: {item.time.minutes}m {item.time.seconds}s</Text>
            </View>
          )}
        />
      )}

      <Button title="Save Workout" onPress={handleSaveWorkout} />
      <Button title="Back to Home" onPress={() => router.push('/(app)/home')}/>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 6,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  
  card: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  
  exerciseName: {
    fontWeight: 'bold',
  },
});