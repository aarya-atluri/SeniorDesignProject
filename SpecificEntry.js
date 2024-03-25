// HealthScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
//Test
const SpecificEntry =({route}) => {
  const todayDate = new Date().toLocaleDateString(); // Get today's date in a readable format

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{todayDate}</Text>
        <View style={styles.sameRow}>
          <Image
            style={styles.image}
            source={require('./assets/images/excited.jpg')} // Change the path to your image
          />
        </View>
        <Text style ={styles.subSection}> Journal Entry</Text>
        <TextInput
          multiline = {true}
          placeholder = "Hi"
          style = {styles.text}
          />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    sameRow: {
      flexDirection: 'row', // Arrange items horizontally
    },
    sectionTitle: {
      fontSize: 40,
      padding: 50,
      fontWeight: '600',
      fontFamily: 'ProtestRiot-Regular',
      color: '#5d4632',
    },
    image: {
      width: 60,
      height: 60,
      margin: 5,
      resizeMode: 'contain', // Adjust the resizeMode as per your requirement
    },
    subSection: {
      fontSize: 20,
      fontWeight: '600',
      fontFamily: 'ProtestRiot-Regular',
      paddingLeft: 150,
      paddingBottom: 10,
      alignSelf: 'flex-start',
      color: '#5d4632',
    },
    button: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      overflow: 'hidden',
      width: 200,
      height: 40,
      borderRadius: 20,
      fontFamily: 'ProtestRiot-Regular',
      bottom: 40
    },
    text: {
      fontSize: 10,
      width: '80%',
      height: 150,
      padding: 10,
      letterSpacing: 0.25,
      fontFamily: 'ProtestRiot-Regular',
      borderWidth: 1,
      backgroundColor: '#d8e1e9',
      borderColor: '#d8e1e9',
      borderRadius: 15,
    },
  });

export default SpecificEntry;