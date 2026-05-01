// services/workoutService.js
import { db, auth } from './firebase';
import { ref, push, set } from 'firebase/database';

export async function addWorkoutLog(workout) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User must be logged in to save a workout log.');
  }

  const logRef = push(ref(db, `users/${user.uid}/exerciseLogs`));

  const newLog = {
    logID: logRef.key,
    date: workout.date,
    exerName: workout.exerName,
    exerID: workout.exerID,
    sets: Number(workout.sets),
    reps: Number(workout.reps),
    time: {
      minutes: Number(workout.minutes),
      seconds: Number(workout.seconds),
    },
    createdAt: Date.now(),
  };

  await set(logRef, newLog);

  return newLog;
}