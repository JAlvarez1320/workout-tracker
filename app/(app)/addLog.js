import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { addWorkoutLog } from '../../services/workoutService';
import { useRouter } from 'expo-router';

export default function AddLogScreen() {
  const [exerName, setExerName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSaveWorkout = async () => {
    try {
      console.log('Save button pressed');


      const savedLog = await addWorkoutLog({
        date: new Date().toISOString().split('T')[0],
        exerName,
        exerID: exerName.toLowerCase().replace(/\s+/g, '_'),
        sets,
        reps,
        minutes,
        seconds,
      });

      console.log('Workout saved!', savedLog);
      setMessage('Workout saved!');

      // Clear inputs
      setExerName('');
      setSets('');
      setReps('');
      setMinutes('');
      setSeconds('');
    } catch (error) {
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
        onChangeText={setSets}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Reps"
        value={reps}
        onChangeText={setReps}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Minutes"
        value={minutes}
        onChangeText={setMinutes}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Seconds"
        value={seconds}
        onChangeText={setSeconds}
        keyboardType="numeric"
        style={styles.input}
      />

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
});