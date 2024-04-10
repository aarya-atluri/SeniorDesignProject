import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from './App';
import { auth, db } from './Firebase/firebaseConfig'; // Make sure this path matches your project structure
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc} from 'firebase/firestore';

const CompleteSetup = ({ route }) => {
  const { username, password, name, age, gender } = route.params;
  const { setIsSignedIn } = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
       const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      //const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', auth.currentUser.uid);
      // const journalEntriesRef = collection(userRef, 'journal_entries');

      // const defaultEntry = {
      //   date: "", 
      //   text: "",
      //   mood: "Meh" 
      // };

      // Add user data to Firestore collection
      await setDoc(userRef,{
          email: username,
          name,
          gender,
          age,
          profile_pic: "",
          // journalEntriesRef: [defaultEntry]
      });


      console.log("User added with ID: ", userRef.id);

      setIsSignedIn(true);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error
    }
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
      <TouchableOpacity style={styles.swellButton} onPress={handleSignUp}>
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
