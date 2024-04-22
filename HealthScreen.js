// HealthScreen.js
import React, { useState, useEffect } from 'react';
// code for health bars
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';

import { View, Text, StyleSheet } from 'react-native';
import {fetchTodayTotal} from './JournalUtils';

  const MetricsBar = ({label, value, hours, minutes, maxValue, unit, color}) => {
    const percentage = (value / maxValue) * 100;

    const adjusted = ((hours + minutes / 60) / maxValue) * 100;


    if(label == "Physical Activity" || label == "Sleep Duration"){
      return(
        <View style = {styles.container}>
          <Text style = {styles.label}>{label}</Text>
          <View style = {styles.barContainer}>
            <View style={[styles.bar, { width: `${adjusted}%`, backgroundColor: color }]}></View>
            </View>
            <Text style={styles.value}>{`${hours} hrs ${minutes} minutes`}</Text>
    
        </View>
      );
    }
   

    return(
    <View style = {styles.container}>
      <Text style = {styles.label}>{label}</Text>
      <View style = {styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: color }]}></View>
        </View>
        <Text style={styles.value}>{`${value} ${unit}`}</Text>

    </View>
    
  );
};

//Test
const HealthScreen = () => {

  const [sleepHoursTotal, setSleepHoursTotal] = useState('');
  const [sleepMinsTotal, setSleepMinsTotal] = useState('');
  const [physicalActivityHoursTotal, setPhysicalActivityHoursTotal] = useState('');
  const [physicalActivityMinsTotal, setPhysicalActivityMinsTotal] = useState('');
  const [caffeineTotal, setCaffeineTotal] = useState('');
  const [waterIntakeTotal, setWaterIntakeTotal] = useState('');

  const getLocalDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };


  const fetchUserData = async () => {
    try {
      if (!auth.currentUser) return; // Check if user is logged in
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  useEffect(() => {
  // when component mounts
    fetchUserData();
    // daily health stats
    fetchTodayTotal(auth.currentUser?.uid).then(totals => {
      console.log(totals);
      setSleepHoursTotal(totals.sleepHoursTotal);
      setSleepMinsTotal(totals.sleepMinsTotal);
      setPhysicalActivityMinsTotal(totals.physicalActivityMinsTotal);
      setPhysicalActivityHoursTotal(totals.physicalActivityHoursTotal);
      setCaffeineTotal(totals.caffeineTotal);
      setWaterIntakeTotal(totals.waterIntakeTotal);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      <Text style={styles.localDate}>{getLocalDate()}</Text>
      <View style={styles.metricsContainer}>
        <MetricsBar label = "Sleep Duration" hours = {sleepHoursTotal} minutes = {sleepMinsTotal} maxValue = {8}  color= "purple" />
        </View>
      <View style={styles.metricsContainer}>
        <MetricsBar label = "Physical Activity" hours = {physicalActivityHoursTotal} minutes = {physicalActivityMinsTotal} maxValue = {3} color = "orange"/>
      </View>
      <View style={styles.metricsContainer}>
        <MetricsBar label = "Water Intake" value = {waterIntakeTotal} maxValue = {8} unit = "cups" color = "aqua" />
       </View>
      <View style={styles.metricsContainer}>
        <MetricsBar label = "Caffeine Consumption" value = {caffeineTotal} maxValue = {500} unit = "mg" color = "#e74c3c"/>
      </View>
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
    fontSize: 32,
    color: '#6D4B36',
    fontFamily: 'ProtestRiot-Regular',
    fontWeight: '600',
  },
  label:{
    fontsize: 24,
    fontWeight: 'bold',
    color: '#6D4B36',
    marginBottom: 5,
  },
  metricsContainer: {
    backgroundColor: '#fff',
    width: '70%',
    marginTop: 5,
    marginBottom: 2,
  },
  barContainer:{
    backgroundColor: '#ddd',
    height: 20,
    width: '30%',
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
    fontFamily: 'ProtestRiot-Regular',
  },

});

export default HealthScreen;

