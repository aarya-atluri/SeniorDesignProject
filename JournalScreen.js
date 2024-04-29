import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {auth, db} from './Firebase/firebaseConfig'
import {collection, query, where, doc, getDoc} from 'firebase/firestore'


<<<<<<< HEAD
const CalendarScreen = ({}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation(); // Initialize navigation

  const handleDayPress = async (day) => {
    // Navigate to a different screen upon pressing a specific date
    const selectedDate = day.dateString;
  
  // Check if there are entries for the selected date
=======
const JournalScreen = ({route}) => {
  const [dailySleepHour, setDailySleepHour] = useState(0);
  const [dailySleepMin, setDailySleepMin] = useState(0);
  const[dailySleep, setSleep] = useState('')
  const[activityHr, setExerciseHour] = useState(0);
  const[activityMins, setExerciseMin] = useState(0);
  const[dailyExercise, setExercise] = useState('');
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
    const [hoursStr, minutesStr] = text.split(':');
  
    setSleep(text);
    setDailySleepHour(parseInt(hoursStr, 10));
    setDailySleepMin(parseInt(minutesStr,10));
  };

  const onExerciseChangeHandler = (text) => {
    const [activityhr, activitymin] = text.split(':');
  
    setExercise(text);
    setExerciseHour(parseInt(activityhr, 10)); 
    setExerciseMin(parseInt(activitymin, 10));
  };

  const onWaterChangeHandler = (text) => {
    setWater(text);
  };

  const onCaffeineChangeHandler = (text) => {
    setCaffeine(text);
  };

  const onPressHandler = async () => {
>>>>>>> refs/remotes/origin/main
    try {
    const moodRef = collection(db, 'journal_entries');
    const q = query(moodRef, where('date', '==', selectedDate));
    const querySnapshot = await getDoc(q);
    
    if (querySnapshot.size > 0) {
      navigation.navigate('SpecificEntry', { selectedDate });
    } else {
      // Handle case where there are no entries for the selected date
      console.log('No entries found for the selected date.');
    }
  } catch (error) {
    console.error('Error fetching entries:', error);
  }
  };

<<<<<<< HEAD
  const onPressHandler =() => {
    navigation.navigate('Journal')
  };
=======
      await entryRef.add({
        date: todayDate,
        entry: dailyEntry,
        sleep_mins: dailySleepMin,
        sleep_hours: dailySleepHour,
        activity_hours: activityHr,
        activtiy_mins: activityMins,
        water: dailyWater,
        caffeine: dailyCaffeine,
        mood: selectedMood ? getImageUrl(selectedMood) : null 
>>>>>>> refs/remotes/origin/main


  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const moodRef = collection(db, 'journal_entries');
        const querySnapshot = await getDoc(moodRef);
        
        const markedDatesObject = {};

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const date = data.date;
          const mood = data.mood;

          markedDatesObject[date] = { selected: true, selectedColor: getMoodColor(mood) };
        });

        setMarkedDates(markedDatesObject);
      } catch (error) {
        console.error('Error fetching moods:', error);
      }
    };

    fetchMoods();
  }, []);

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'excited':
        return 'green';
      case 'happy':
        return 'yellow';
      case 'meh':
        return 'brown';
      case 'sad':
        return 'blue';
      case 'dead':
        return 'purple';
      default:
        return 'white';
    }
  };

  const theme = {
    textDayFontFamily: 'ProtestRiot-Regular',
    textMonthFontFamily: 'ProtestRiot-Regular',
    textDayHeaderFontFamily: 'ProtestRiot-Regular',
    textDayFontSize: 16,
    textMonthFontSize: 30,
    textDayHeaderFontSize: 16,
    todayTextColor: 'blue',
    selectedDayBackgroundColor: 'green',
    arrowColor: 'orange',
    monthTextColor: '#d8e1e9',
    'stylesheet.day.basic':{
      'base':{
        width:125,
        height:40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      },
      'text': {
        marginTop: 6,
        fontSize: 16,
        fontFamily: 'ProtestRiot-Regular',
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Mindful Journal</Text>
      <View style={styles.calendarContainer}>
        <Calendar
        current={currentMonth}
        onMonthChange={(month) => setCurrentMonth(month.dateString)}
        onDayPress={handleDayPress} // Handle press event for a specific 
        theme = {theme}
        style={{
          borderRadius: 15,
        }}
      />
<<<<<<< HEAD
=======

      <View style={styles.sameRow}>
        <Text style ={styles.subSection}> Sleep (_:_)</Text>
        <TextInput 
          placeholder = ""
          onChangeText = {onSleepChangeHandler}
          value = {dailySleep}
          style = {styles.statistics}
          />
>>>>>>> refs/remotes/origin/main
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress= {onPressHandler}
      >
        <Ionicons name="ios-add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 40,
    paddintTop: 20,
    paddingBottom: 40,
    fontWeight: '600',
    color: '#5d4632',
    fontFamily: 'ProtestRiot-Regular'
  },
  text: {
    fontSize: 40,
    padding: 50,
    fontWeight: '600',
    width: '80%',
    height: 150,
    letterSpacing: 0.25,
    fontFamily: 'ProtestRiot-Regular',
    borderWidth: 1,
    borderColor: '#5d4632',
    borderRadius: 15,
  },
  calendarContainer: {
    width: '100%', // Set width to 100% to occupy full width of parent container
    alignItems: 'center', // Center the calendar horizontally
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#8fbc8f',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;

