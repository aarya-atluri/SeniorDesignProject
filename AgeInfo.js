import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';

const AgeGenderScreen = ({ navigation, route }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(null);
  
  // Retrieve username, password, and name from navigation parameters
  const { username, password, name } = route.params;

  const handleContinue = () => {
    // Implement what happens when the user presses continue
    // You could pass the age and gender along with the previously passed data to the next screen or make an API call, etc.
    console.log({ username, password, name, age, gender });
    navigation.navigate('CompleteSetup', { username, password, name, age, gender });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={require('./logo.png')}
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
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
