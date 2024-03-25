import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from './App'; // Import AuthContext from the file App.js is in
import { auth, db } from './Firebase/firebaseConfig'; // Update the path if necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';



const CompleteSetup = ({ route }) => {
  // Retrieve user details and context from route and AuthContext
  const { username, password, name, age, gender } = route.params;
  const { setIsSignedIn } = useContext(AuthContext);

  const handleSwell = () => {
    // Sign up user with Firebase Authentication
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
  
        // Add additional user information to Firestore
        return setDoc(doc(db, "users", user.uid), {
          name: name,
          age: age,
          gender: gender,
        });
      })
      .then(() => {
        // Data saved successfully in Firestore, update the signed-in state
        //setIsSignedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors
        console.error("Error signing up in Firebase Authentication: ", errorMessage);
        // Update the UI to show the error message, if necessary
      });
      setIsSignedIn(true);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.setupText}>You're all set up!</Text>
      <Image 
        source={require('./assets/Complete.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={[styles.nameText, { color: 'darkviolet' }]}>{name}</Text>
      <TouchableOpacity style={styles.swellButton} onPress={handleSwell}>
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
