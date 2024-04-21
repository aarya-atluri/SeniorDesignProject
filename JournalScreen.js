// JournalScreen.js
import React, {useState} from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { Image, TextInput, SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import { useFonts } from 'expo-font';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import {auth, db} from './Firebase/firebaseConfig'
import {doc, getDoc} from 'firebase/firestore'


const JournalScreen = ({route}) => {
  const[dailySleep, setSleep] = useState('')
  const[dailyExercise, setExercise] = useState('')
  const[dailyEntry, setDiary] = useState('')
  const[dailyWater, setWater] = useState('')
  const[dailyCaffeine, setCaffeine] = useState('')
  const [selectedMood, setMood] = useState(null);
  
  const navigation = useNavigation();

  const onImageHandler = (imageId) => {
    setMood(imageId);
  }

  const onTextChangeHandler = (text) => {
    setDiary(text);
  };

  const onSleepChangeHandler = (text) => {
    setSleep(text);
  };

  const onExerciseChangeHandler = (text) => {
    setExercise(text);
  };

  const onWaterChangeHandler = (text) => {
    setWater(text);
  };

  const onCaffeineChangeHandler = (text) => {
    setCaffeine(text);
  };

  const onPressHandler = async () => {
    try {
      const todayDate = new Date().toLocaleDateString(); 
      const entryRef = db.collection('journal_entries');

      await entryRef.add({
        date: todayDate,
        entry: dailyEntry,
        sleep: dailySleep,
        exercise: dailyExercise,
        water: dailyWater,
        caffeine: dailyCaffeine,
        mood: selectedMood ? getImageUrl(selectedMood) : null 

      });

    navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
      navigation.goBack();
    }
  };

return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>How Are You Feeling?</Text>
      <View style={styles.sameRow}>
        <TouchableOpacity onPress ={() => onImageHandler(1)}>
        <Image
          style={styles.image}
          source={require('./assets/images/excited.jpg')} // Change the path to your image
        />
        </TouchableOpacity>

        <TouchableOpacity onPress ={() => onImageHandler(2)}>
        <Image
          style={styles.image}
          source={require('./assets/images/happy.jpg')} // Change the path to your image
        />
        </TouchableOpacity>

        <TouchableOpacity onPress ={() => onImageHandler(3)}>
        <Image
          style={styles.image}
          source={require('./assets/images/meh.jpg')} // Change the path to your image
        />
        </TouchableOpacity>

        <TouchableOpacity onPress ={() => onImageHandler(4)}>
        <Image
          style={styles.image}
          source={require('./assets/images/sad.jpg')} // Change the path to your image
        />
        </TouchableOpacity>
        <TouchableOpacity onPress ={() => onImageHandler(5)}> 
        <Image
          style={styles.image}
          source={require('./assets/images/dead.jpg')} // Change the path to your image
        />
        </TouchableOpacity>
      </View>
      
      <Text style ={styles.subSection}> New Journal Entry</Text>
      <TextInput
        multiline = {true}
        placeholder = "Share your thoughts here"
        onChangeText = {onTextChangeHandler}
        value = {dailyEntry}
        style = {styles.text}
      />

      <View style={styles.sameRow}>
        <Text style ={styles.subSection}> Sleep</Text>
        <TextInput 
          placeholder = ""
          onChangeText = {onSleepChangeHandler}
          value = {dailySleep}
          style = {styles.statistics}
          />
      </View>

      <View style={styles.sameRow}>
          <Text style ={styles.subSection}> Exercise</Text>
          <TextInput 
          placeholder = ""
          onChangeText = {onExerciseChangeHandler}
          value = {dailyExercise}
          style = {styles.statistics}
          />
      </View>
    
      <View style={styles.sameRow}>
          <Text style ={styles.subSection}> Water </Text>
          <TextInput 
          placeholder = ""
          onChangeText = {onWaterChangeHandler}
          value = {dailyWater}
          style = {styles.statistics}
          />
      </View>
    
      <View style={styles.sameRow}>
          <Text style ={styles.subSection}> Caffeine</Text>
          <TextInput
          placeholder = ""
          onChangeText = {onCaffeineChangeHandler}
          value = {dailyCaffeine}
          style = {styles.statistics}
          />
      </View>
      
      <View style= {styles.button}>
          <Button 
          title = "Check In" 
          width = '150'
          onPress={onPressHandler} 
          color='#5d4632' />
      </View>
      
  
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
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
    paddingTop: 60,
    paddingBottom: 40,
    fontWeight: '600',
    fontFamily: 'ProtestRiot-Regular',
    color: '#5d4632',
  },
  image: {
    width: 50,
    height: 50,
    margin: 5,
    resizeMode: 'contain', // Adjust the resizeMode as per your requirement
  },
  topper: {
    width: '100%',
    height: '70%',
    position: 'absolute'
  },
  overlayContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as per your requirement
    paddingTop: 20,
  },
  subSection: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'ProtestRiot-Regular',
    paddingLeft: 100,
    paddingBottom: 10,
    alignSelf: 'flex-start',
    color: '#5d4632',
  },
  statistics:{
    borderBottomWidth: 1, // Add border bottom
    borderColor: '#5d4632', // Set border color
    paddingBottom: 5, // Add padding to create space between text and underline
    paddingLeft: 20,
    marginBottom: 10, // Add margin bottom to separate TextInput
    alignSelf: 'flex-start',
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
    height: 100,
    padding: 10,
    paddingBottom: 50,
    fontFamily: 'ProtestRiot-Regular',
    backgroundColor: '#d8e1e9',
    borderColor: '#d8e1e9',
    borderRadius: 15,
  },
});

export default JournalScreen;