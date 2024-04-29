import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from './Firebase/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, Timestamp, orderBy , limit} from 'firebase/firestore';

const CalendarScreen = ({}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();

  const handleDayPress = async (day) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('No user found.');
        return;
      }
  
      const selectedDate = day.dateString;
      const dateOnlyTimestamp = Timestamp.fromDate(new Date(selectedDate)); // Convert selected date to Firestore timestamp at midnight
  
      const userEntriesRef = collection(db, 'users', user.uid, 'journal_entries');
      const q = query(
        userEntriesRef,
        where('date', '>=', dateOnlyTimestamp),
        where('date', '<', Timestamp.fromMillis(dateOnlyTimestamp.toMillis() + 86400000)), // Query using Firestore timestamp for the entire day
        orderBy('date', 'desc'), // Order by date in descending order
        limit(1) // Limit the result to the most recent entry
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Retrieve the first (most recent) document
        const mostRecentEntry = querySnapshot.docs[0];
        navigation.navigate('SpecificEntry', { thisEntry: mostRecentEntry.id }); // Pass the document ID to SpecificEntry
      } else {
        console.log('No entries found for the selected date.');
        // Optionally, you can navigate to a different screen or display a message
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      // Handle the error appropriately, e.g., display an error message
    }
  };

  const onPressHandler = () => {
    navigation.navigate('Journal');
  };

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const moodRef = collection(db, 'journal_entries');
        const querySnapshot = await getDocs(moodRef);

        const markedDatesObject = {};

        querySnapshot.forEach((doc) => {
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
    'stylesheet.day.basic': {
      base: {
        width: 125,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
      },
      text: {
        marginTop: 6,
        fontSize: 16,
        fontFamily: 'ProtestRiot-Regular',
      },
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Mindful Journal</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}
          onMonthChange={(month) => setCurrentMonth(month.dateString)}
          onDayPress={handleDayPress} // Handle press event for a specific date
          theme={theme}
          style={{
            borderRadius: 15,
          }}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onPressHandler}>
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
    paddingTop: 20,
    paddingBottom: 40,
    fontWeight: '600',
    color: '#5d4632',
    fontFamily: 'ProtestRiot-Regular',
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
