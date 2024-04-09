import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from './App';
import { auth } from './Firebase/firebaseConfig'; // Make sure this path matches your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CompleteSetup = ({ route }) => {
  const { username, password, name, age, gender } = route.params;
  const { setIsSignedIn } = useContext(AuthContext);

  

  return (
    <View style={styles.container}>
      <Text style={styles.setupText}>You're all set up!</Text>
      <Image 
        source={require('./assets/Complete.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={[styles.nameText, { color: 'darkviolet' }]}>{name}</Text>
      <TouchableOpacity style={styles.swellButton} onPress={() => 
        createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          // User is signed in, userCredential contains the user info
          const user = userCredential.user;
          
          setIsSignedIn(true);
        })
        
        }>
        <Text style={styles.buttonText}>On to Swell!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  setupText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4f3422', // Brown color for the setup text
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f3422', // Brown color for the word "Welcome"
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  swellButton: {
    backgroundColor: '#4f3422',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
});

export default CompleteSetup;
