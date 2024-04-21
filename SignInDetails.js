import React from 'react';
import {useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './App';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './Firebase/firebaseConfig';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignInDetailsScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleContinue = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', auth.currentUser.uid);
      console.log("User signed in with ID: ", userRef.id);

      // Fetch user data from Firestore
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      // Extract user's name from userData
      const named = userData.name;


      navigation.navigate('CompleteSetup', { username, password, name: named });
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: '#f7f4f2' }]}
    >
      {/* Image component added here */}
      <Image
        source={require('./assets/Account.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={[styles.headerText, { color: '#4f3422' }]}>Sign Into Your Account!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
          <View style={{ flexDirection: 'row' }}>
            <Ionicons name="arrow-forward" size={24} color="#f7f4f2" />
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    width: 340, // Adjust to preferred width
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '80%', // Inputs will fill the width of the inputContainer
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 25, // Set to half of the height to make it circular
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#4f3422',
    padding: 10,
    borderRadius: 30, // A large borderRadius value will make it circular
    width: 300, // Width and Height should be the same for a circle
    height: 60, // Width and Height should be the same for a circle
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // Remove flexDirection as we only have an icon
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8, // Add some space between text and icon
  },
  logo: {
    width: 400, // Set width according to your image size
    height: 400, // Set height according to your image size
    marginBottom: 20, // Adjust margin as needed
  },
});

export default SignInDetailsScreen;
