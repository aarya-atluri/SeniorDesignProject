// HealthScreen.js
import React, { useState, useEffect } from 'react';
// code for health bars
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc, Timestamp , onSnapshot} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { PieChart } from 'react-native-chart-kit';

import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {fetchTodayTotal, fetchPieChartData} from './JournalUtils';

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

  const [userData, setUserData] = useState(null);

  const [sleepHoursTotal, setSleepHoursTotal] = useState('');
  const [sleepMinsTotal, setSleepMinsTotal] = useState('');
  const [physicalActivityHoursTotal, setPhysicalActivityHoursTotal] = useState('');
  const [physicalActivityMinsTotal, setPhysicalActivityMinsTotal] = useState('');
  const [caffeineTotal, setCaffeineTotal] = useState('');
  const [waterIntakeTotal, setWaterIntakeTotal] = useState('');

  const[goodSleepExcited, setGS1] = useState(0);
  const[goodSleepHappy, setGS2] = useState(0);
  const[goodSleepMeh, setGS3] = useState(0);
  const[goodSleepSad, setGS4] = useState(0);
  const[goodSleepDead, setGS5] = useState(0);
  const[badSleepExcited, setBS1] = useState(0);
  const[badSleepHappy, setBS2] = useState(0);
  const[badSleepMeh, setBS3] = useState(0);
  const[badSleepSad, setBS4] = useState(0);
  const[badSleepDead, setBS5] = useState(0);
  const[goodExerciseExcited, setGE1] = useState(0);
  const[goodExerciseHappy, setGE2] = useState(0);
  const[goodExerciseMeh, setGE3] = useState(0);
  const[goodExerciseSad, setGE4] = useState(0);
  const[goodExerciseDead, setGE5] = useState(0);
  const[badExerciseExcited, setBE1] = useState(0);
  const[badExerciseHappy, setBE2] = useState(0);
  const[badExerciseMeh, setBE3] = useState(0);
  const[badExerciseSad, setBE4] = useState(0);
  const[badExerciseDead, setBE5] = useState(0);

  const getLocalDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };


  const fetchUserData = async () => {
    try {
      if (!auth.currentUser) return;
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
        } else {
          console.log('No such document!');
        }
      });
      return unsubscribe; // Return the unsubscribe function to clean up the listener
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

    // pie charts
    fetchPieChartData(auth.currentUser?.uid).then(data => {
      console.log(data);
      setGS1(data.goodSleepExcited);
      setGS2(data.goodSleepHappy);
      setGS3(data.goodSleepMeh);
      setGS4(data.goodSleepSad);
      setGS5(data.goodSleepDead);
      setBS1(data.badSleepExcited);
      setBS2(data.badSleepHappy);
      setBS3(data.badSleepMeh);
      setBS4(data.badSleepSad);
      setBS5(data.badSleepDead);
      setGE1(data.goodExerciseExcited);
      setGE2(data.goodExerciseHappy);
      setGE3(data.goodExerciseMeh);
      setGE4(data.goodExerciseSad);
      setGE5(data.goodExerciseDead);
      setBE1(data.badExerciseExcited);
      setBE2(data.badExerciseHappy);
      setBE3(data.badExerciseMeh);
      setBE4(data.badExerciseSad);
      setBE5(data.badExerciseDead);
    });
  }, []);


  // pie charts

  const sleepBad = [
    { name: 'Excited', count: badSleepExcited, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5},
    { name: 'Happy', count: badSleepHappy, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: badSleepMeh, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: badSleepSad, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: badSleepDead, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const sleepGood = [
    { name: 'Excited', count: goodSleepExcited, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: goodSleepHappy, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: goodSleepMeh, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: goodSleepSad, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: goodSleepDead, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const exerciseBad = [
    { name: 'Excited', count: badExerciseExcited, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: badExerciseHappy, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: badExerciseMeh, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: badExerciseSad, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: badExerciseDead, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
  ];
  
  const exerciseGood = [
    { name: 'Excited', count: goodExerciseExcited, color: '#E5EAD7', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Happy', count: goodExerciseHappy, color: '#FFEBC2', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Meh', count: goodExerciseMeh, color: '#E8DDD9', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Sad', count: goodExerciseSad, color: '#F7CFAB', legendFontFamily: 'Arial', legendFontSize: 12.5 },
    { name: 'Dead', count: goodExerciseDead, color: '#DAD4FF', legendFontFamily: 'Arial', legendFontSize: 12.5 },
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
  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Hours of sleep and how you felt:</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.chartContainer}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>Less than 7 hours</Text>
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
    <View style={styles.chartContainer}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>7+ hours</Text>
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
<View style={[styles.metricsContainer, { marginTop: 20 }]}>
  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Physical activity and how you felt:</Text>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={styles.chartContainer}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>Less than 30 mins</Text>
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
    <View style={styles.chartContainer}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 }}>30+ minutes</Text>
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

