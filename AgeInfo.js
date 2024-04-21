import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from './Firebase/firebaseConfig';
import { AuthContext } from './App';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AgeGenderScreen = ({ navigation, route }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);
  
  // Retrieve username, password, and name from navigation parameters
  const { username, password, name } = route.params;

  const handleContinue = () => {
    console.log({ username, password, name, age, gender });
    navigation.navigate('CompleteSetup', { username, password, name, age, gender });
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
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
      handleContinue();
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('./assets/logo.png')}
        style={styles.image}
      />
      <Text style={styles.questionText}>What's your age?</Text>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="Enter your age"
        keyboardType="number-pad"
      />
      <Text style={styles.questionText}>What's your gender?</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity 
          style={[styles.genderOption, gender === 'male' && styles.selectedGenderMale]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>I am Male</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.genderOption, gender === 'female' && styles.selectedGenderFemale]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>I am Female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleSignUp}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f7f4f2', // Background color set here
    },
    image: {
      width: '80%',
      height: 100,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    questionText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    input: {
      height: 60,
      width: '30%',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    genderContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    genderOption: {
      backgroundColor: '#eee',
      padding: 15,
      borderRadius: 10,
      margin: 5,
    },
    selectedGenderMale: {
      backgroundColor: 'rgba(221, 160, 221, 0.7)', // Lavender color with opacity
    },
    selectedGenderFemale: {
      backgroundColor: 'rgba(221, 160, 221, 0.7)', // Lavender color with opacity
    },
    genderText: {
      color: '#333',
      fontSize: 18,
    },
    continueButton: {
      backgroundColor: '#4f3422',
      padding: 15,
      borderRadius: 10,
      width: '20%',
      alignItems: 'center',
    },
    continueText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  

export default AgeGenderScreen;
