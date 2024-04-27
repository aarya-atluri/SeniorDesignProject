// HealthScreen.js
import React, { useState, useEffect } from 'react';
// code for health bars
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { PieChart } from 'react-native-chart-kit';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
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


  // pie charts

  const sleepBad = [
    { name: 'Excited', count: 1, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5},
    { name: 'Happy', count: 1, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: 5, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: 5, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: 10, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const sleepGood = [
    { name: 'Excited', count: 10, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: 5, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: 5, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: 1, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: 1, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const exerciseBad = [
    { name: 'Excited', count: 2, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: 3, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: 7, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: 6, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: 4, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const exerciseGood = [
    { name: 'Excited', count: 10, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: 9, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: 3, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: 0, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: 0, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Health Metrics</Text>
      <Text style={styles.localDate}>{getLocalDate()}</Text>
      <ScrollView style={styles.scrollViewContent}>
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
      <View style={styles.metricsContainer}> <View>
      <View style={styles.metricsContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Hours of sleep and how you felt:</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Less than 7 hours</Text>
            <PieChart
              data={sleepBad}
              width={250}
              height={150}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="25"
              absolute
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>7+ hours</Text>
            <PieChart
              data={sleepGood}
              width={250}
              height={150}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="25"
              absolute
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Physical activity and how you felt:</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Less than 30 minutes</Text>
            <PieChart
              data={exerciseBad}
              width={250}
              height={150}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="25"
              absolute
            />
          </View>
          <View style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>30+ minutes</Text>
            <PieChart
              data={exerciseGood}
              width={250}
              height={150}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="25"
              absolute
            />
          </View>
        </View>
      </View>
    </View>

      </View>
      </ScrollView>
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
    borderRadius: 31,
    width: '70%',
    marginTop: 5,
    marginBottom: 2,
    alignSelf: 'center',
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
  scrollViewContent: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default HealthScreen;

