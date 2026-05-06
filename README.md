# Workout Tracker

A mobile workout tracker built with Expo, React Native, and Firebase. This app helps users log workouts, view exercise history, and track progress toward fitness goals.

## Features

- Track workout logs and session details
- View workout history and progress over time
- User authentication and Realtime Database with Firebase Platform

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

Then open the app on a simulator, physical device, or web browser using the Expo dev tools.

### Run on a specific platform

```bash
npm run android
npm run ios
npm run web
```

## How to Use the App

1. Open the app
2. If you are new, select **Don't have an account? Sign Up** and create an account using your display name, email, and password.
3. After successful registration, log in from the login screen with your email and password.
4. On the home screen, tap **Add Workout Log** to record a new exercise.
5. Enter the exercise name, sets, reps, and optional time spent (minutes and seconds).
6. Tap **Save Workout** to store the log in Firebase.
7. Use the **Show/Hide** button to toggle the current workout entry list on the add log screen.
8. Return to the home screen and choose **View History** to see all saved workouts.
9. The history screen displays each log with date, exercise name, sets, reps, and time.
10. Tap **Logout** on the home screen to sign out.

## Project Structure

- `app/` - Expo Router screens and navigation layout
- `components/` - Reusable UI components
- `constants/` - Theme and app constants
- `context/` - Authentication context and state management
- `hooks/` - Custom hooks for theme and color scheme
- `services/` - Firebase and workout data services
- `scripts/` - Utility scripts such as project reset
