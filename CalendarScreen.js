import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = ({ route }) => {
  const { userInput } = route.params;
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
  const navigation = useNavigation(); // Initialize navigation

  const handleDayPress = (day) => {
    // Navigate to a different screen upon pressing a specific date
    navigation.navigate('SpecificEntry', { selectedDate: day });
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
      </View>
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
    padding: 40,
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
});

export default CalendarScreen;