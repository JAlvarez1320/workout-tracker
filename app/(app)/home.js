import { useRouter } from "expo-router";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '../../components/parallax-scroll-view';
import { useAuth } from '../../context/auth_context';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ParallaxScrollView
        headerImage={
          <ImageBackground
            source={require('../../assets/images/blurred-gym.jpg')}
            style={styles.headerContainer}
            imageStyle={styles.backgroundImage}
          >
            <Image
              source={require('../../assets/images/lift-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </ImageBackground>
        }
        headerBackgroundColor={{ light: '#ffffff'}}
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome, {user?.name}!</Text>
          <Text style={styles.subtitleText}>Track your fitness journey</Text>

        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  backgroundContent: {
    flex: 1,
    minHeight: 500,
  },
  bottomBackgroundImage: {
    resizeMode: 'cover',
    opacity: 0.3,
  },
  logo: {
    width: 300,
    height: 300,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
});
