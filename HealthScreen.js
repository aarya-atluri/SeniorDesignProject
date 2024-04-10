// HealthScreen.js
import React from 'react';
//import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

//import React, { useEffect, useState } from 'react';
//import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
//import MapView, { Marker } from 'react-native-maps';
//import Geolocation from '@react-native-community/geolocation';
//Test

// code for health bars

import { View, Text, StyleSheet } from 'react-native';

  const MetricsBar = ({label, value, maxValue, unit, color}) => {
    const percentage = (value / maxValue) * 100;
    const simplifiedValue = value % 1 === 0 ? value : value.toFixed(1);
   

    return(
    <View style = {styles.container}>
      <Text style = {styles.label}>{label}</Text>
      <View style = {styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]}></View>
        </View>
        <Text style={styles.value}>{`${simplifiedValue} ${unit}`}</Text>

    </View>
  );
};

//Test
const HealthScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      <MetricsBar label = "Sleep Duration" value = {6} maxValue = {8} unit = "hrs" color= "purple" />
      <MetricsBar label = "Exercise Amount"value = {0.5} maxValue = {2} unit = "hrs" color = "orange"/>
      <MetricsBar label = "Water Intake" value = {2} maxValue = {8} unit = "cups" color = "aqua" />
      <MetricsBar label = "Caffeine Consumption" value = {300} maxValue = {500} unit = "mg" color = "#e74c3c"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  label:{
    fontsize: 18,
    marginBottom: 5,
  },
  barContainer:{
    backgroundColor: '#ddd',
    height: 20,
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
  },
  bar:{
    color: 'aqua',
    height:'100%',
    borderRadius: 10,
  },
  value: {
    fontSize: 16,
  },

/*
const HealthScreen = () => {
 
  const [sleepAmount, setSleepAmount] = useState('');
  const [exerciseAmount, setExerciseAmount] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [coffeeConsumption, setCoffeeConsumption] = useState('');

  const handleSleepInput = () => {
    // Handle sleep amount input
    console.log('Sleep amount:', sleepAmount);
  };

  const handleExerciseInput = () => {
    // Handle exercise amount input
    console.log('Exercise amount:', exerciseAmount);
  };

  const handleWaterInput = () => {
    // Handle water intake input
    console.log('Water intake:', waterIntake);
  };

  const handleCoffeeInput = () => {
    // Handle coffee consumption input
    console.log('Coffee consumption:', coffeeConsumption);
  };

  return (
    <View style={styles.container}>
      <Text>Input Sleep Amount:</Text>
      <TextInput
        style={styles.input}
        value={sleepAmount}
        onChangeText={setSleepAmount}
        keyboardType="numeric"
      />
      <Button title="Input Sleep Amount" onPress={handleSleepInput} color="purple" />

      <Text>Input Exercise Amount:</Text>
      <TextInput
        style={styles.input}
        value={exerciseAmount}
        onChangeText={setExerciseAmount}
        keyboardType="numeric"
      />
      <Button title="Input Exercise Amount" onPress={handleExerciseInput} color="orange" />

      <Text>Input Water Intake:</Text>
      <TextInput
        style={styles.input}
        value={waterIntake}
        onChangeText={setWaterIntake}
        keyboardType="numeric"
      />
      <Button title="Input Water Intake" onPress={handleWaterInput} color="aqua" />

      <Text>Input Coffee Consumption:</Text>
      <TextInput
        style={styles.input}
        value={coffeeConsumption}
        onChangeText={setCoffeeConsumption}
        keyboardType="numeric"
      />
      <Button title="Input Coffee Consumption" onPress={handleCoffeeInput} color="#F5F5DC" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,


    /*
    const [homeLocation, setHomeLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [visitedLocations, setVisitedLocations] = useState([]);
    const [leftHome, setLeftHome] = useState(false);
    const [isAtHome, setIsAtHome] = useState(null);
 
    useEffect(() => {
      // Get user's current location
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }, []);
 
    const setAsHome = () => {
      if (currentLocation) {
        setHomeLocation(currentLocation);
        setIsAtHome(true);
        alert('Home location set successfully.');
      } else {
        alert('Unable to set home location. Please make sure location services are enabled.');
      }
    };
 
    const setNotAtHome = () => {
      setIsAtHome(false);
    };
 
    const checkLocation = location => {
      // Check if the user left home
      if (homeLocation && !leftHome) {
        const distance = calculateDistance(
          homeLocation.latitude,
          homeLocation.longitude,
          location.latitude,
          location.longitude
        );
        if (distance > 0.1) {
          setLeftHome(true);
        }
      }
 
      // Check if the user visited a new location
      const isNewLocation = visitedLocations.every(
        loc => calculateDistance(loc.latitude, loc.longitude, location.latitude, location.longitude) > 0.1
      );
      if (isNewLocation) {
        setVisitedLocations([...visitedLocations, location]);
      }
    };
 
    useEffect(() => {
      // If the user visited more than 4 locations, recommend resting
      if (visitedLocations.length > 4) {
        alert('You have visited more than 4 different locations today. Consider resting for a while.');
      }
    }, [visitedLocations]);
 
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
          Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; // Distance in kilometers
      return d;
    };
 
    const deg2rad = deg => {
      return deg * (Math.PI / 180);
    };
 
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation ? currentLocation.latitude : 0,
            longitude: currentLocation ? currentLocation.longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {homeLocation && <Marker coordinate={homeLocation} title="Home" />}
          {currentLocation && <Marker coordinate={currentLocation} title="You are here" />}
          {visitedLocations.map((loc, index) => (
            <Marker key={index} coordinate={loc} title={`Location ${index + 1}`} />
          ))}
        </MapView>
        {isAtHome === null && (
          <View style={styles.textBox}>
            <Text style={styles.text}>Are you at home?</Text>
            <View style={styles.buttonContainer}>
              <Button onPress={setAsHome} title="Yes" />
              <Button onPress={setNotAtHome} title="No" />
            </View>
          </View>
        )}
        <Text style={styles.text}>{leftHome ? 'You left home today.' : 'You are at home.'}</Text>
      </View>
    );
  };
 
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    textBox: {
      position: 'absolute',
      top: 20,
      alignItems: 'center',
    },
    text: {
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   

    },
    */
  });

export default HealthScreen;