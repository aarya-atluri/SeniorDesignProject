// JournalScreen.js
import React, {useState} from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { Image, TextInput, SafeAreaView, View, Text, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';
import ImagePicker from 'react-native-image-picker';

const JournalScreen = ({navigation}) => {
  const[dailyEntry, setDiary] = useState('')
  const [selectedMood, setMood] = useState(null);
  

  const onImageHandler = (imageId) => {
    setMood(imageId);
  }

  const onPressHandler =() => {
    navigation.navigate('Calendar', {userText: dailyEntry, imagePicked: selectedMood })
  };

  return (
    <View style={styles.container}>
       <Image
          style={styles.topper}
          source={require('./assets/background_clouds.png')} // Change the path to your image
        />
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
        onChangeText = {setDiary}
        value = {dailyEntry}
        style = {styles.text}
        />
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

export default JournalScreen;