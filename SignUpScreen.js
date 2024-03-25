import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { auth } from './Firebase/firebaseConfig'; // Make sure this path matches your project structure
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './App';


const SignUpScreen = ({ navigation }) => {
  
  const handleSignUpWithGoogle = () => {
    // Handle sign-up with Google logic here
  };

  const goToSignUpDetails = () => {
    // Navigate to the sign-up details screen
    navigation.navigate('SignUpDetails');
  };

  const goToSignInDetails = () => {
    // Navigate to the sign-up details screen
    navigation.navigate('SignInDetails');
  };

  const logoBeige = '#f7f4f2'; // Beige color
  const logoBrown = '#4f3422'; // Brown color

  return (
    <View style={[styles.container, { backgroundColor: logoBeige }]}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={[styles.welcomeText, { color: logoBrown }]}>Welcome to Swell!</Text>
      <Text style={styles.descriptionText}>A mind and body app dedicated to helping you become so well.</Text>
      <Image source={require('./assets/welcome.png')} style={styles.logo2} />
      <TouchableOpacity style={styles.customSignUpButton} onPress={goToSignInDetails}>
        <Text style={styles.buttonTextCustom}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.customSignUpButton} onPress={goToSignUpDetails}>
        <Text style={styles.buttonTextCustom}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // The backgroundColor will be set dynamically to match the logo
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logo2: {
    width: 338,
    height: 347,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    // The color will be set dynamically to match the logo
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGoogle: {
    backgroundColor: '#4f3422',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 16,
    width: '15%', // Adjusted to 80% for better appearance
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    color: '#A9A9A9',
    marginVertical: 8,
  },
  customSignUpButton: {
    backgroundColor: '#4f3422',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 300, // Adjusted to 80% for better appearance
    alignItems: 'center',
  },
  buttonTextCustom: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignUpScreen;