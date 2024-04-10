import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { fetchJournalCount,  fetchJournalEntries, fetchLastMood, getButtonColorFromMood, fetchTodayTotal} from './JournalUtils';
import MoodImage from './Mood'

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [journalCount, setJournalCount] = useState(0);
  const [lastMood, setLastMood] = useState('');
  const [checkinButtonColor, setCheckinButtonColor] = useState('#FFEBC2');
  const [streak, setStreak] = useState(0);
  const [sleepHoursTotal, setSleepHoursTotal] = useState('');
  const [sleepMinsTotal, setSleepMinsTotal] = useState('');
  const [physicalActivityHoursTotal, setPhysicalActivityHoursTotal] = useState('');
  const [physicalActivityMinsTotal, setPhysicalActivityMinsTotal] = useState('');
  const [caffeineTotal, setCaffeineTotal] = useState('');
  const [waterIntakeTotal, setWaterIntakeTotal] = useState('');

  // Function to get the local date
  const getLocalDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  // Function to calculate streak based on journal entries
  const calculateStreak = (journalEntries) => {
    const today = new Date().toISOString().split('T')[0];
    const sortedEntries = journalEntries.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    let streak = 0;
    let currentDate = today;

    for (let i = sortedEntries.length - 1; i >= 0; i--) {
      const entryDate = sortedEntries[i].date;

      if (entryDate === currentDate) {
        streak++;
        currentDate = decrementDate(currentDate);
      } else {
        break;
      }
    }

    return streak;
  };

  const decrementDate = (date) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    return currentDate.toISOString().split('T')[0];
  };


  const fetchUserData = async () => {
    try {
      const docRef = doc(db, 'users', auth.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };


  // when component mounts
  useEffect(() => {
    fetchUserData();
    fetchJournalCount(auth.currentUser?.uid, new Date().toISOString().split('T')[0]).then(count => setJournalCount(count));
    fetchLastMood(auth.currentUser?.uid).then(mood => setLastMood(mood));
    fetchJournalEntries(auth.currentUser?.uid).then(entries => {
      const calculatedStreak = calculateStreak(entries);
      setStreak(calculatedStreak);
    });
    const color = getButtonColorFromMood(lastMood);
    setCheckinButtonColor(color);
    fetchTodayTotal(auth.currentUser?.uid).then(totals => {
      setSleepHoursTotal(totals.sleepHoursTotal);
      setSleepMinsTotal(totals.sleepMinsTotal);
      setPhysicalActivityMinsTotal(totals.physicalActivityMinsTotal);
      setPhysicalActivityHoursTotal(totals.physicalActivityHoursTotal);
      setCaffeineTotal(totals.caffeineTotal);
      setWaterIntakeTotal(totals.waterIntakeTotal);
    });
  }, []);

  const handleDayPress = (day) => {
    // Navigate to a different screen upon pressing a specific date
    navigation.navigate('SpecificEntry', { selectedDate: day });
  };

  return (
    <View style={styles.container}>
      {/* Welcome Bar */}
      <View style={styles.welcomeBar}>
        {/* Local Date */}
        <Text style={styles.localDate}>{getLocalDate()}</Text>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={require('./assets/profile-icon.png')}
            style={styles.profileImage}
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Hi, {userData ? userData.name : 'User'}!</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/fire-icon.svg')}
                style={styles.icon}
              />
              <Text style={styles.bodyText}>{streak}</Text>
              <MoodImage mood={lastMood ? lastMood : 'Unknown'} />
              <Text style={styles.bodyText}>{lastMood ? lastMood : 'Unknown'}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate('Journal')}
        >
          <Image
            source={require('./assets/checkin.svg')}
            style={[styles.greenButton, { width: 100, height: 100 }]}
          />
      </TouchableOpacity>

      <View style={styles.dailyContainer}>
          <Text style={styles.titleText}>Daily Check-in</Text>
        <TouchableOpacity
            style={[styles.checkin, { backgroundColor: checkinButtonColor }]}
            onPress={handleDayPress}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>You checked in {journalCount ? journalCount: 0} times today!</Text>
                <Text style={styles.buttonText}>Your mood was: {lastMood ? lastMood : 'Unknown'}</Text>
              </View>
              <MoodImage
                mood={lastMood ? lastMood : 'Unknown'} 
                style={{ width: 70, height: 70}}
              />
            </View> 
            
          </TouchableOpacity>
      

        <Text style={styles.titleText}>Daily Trackers</Text>
      </View>

        {/* Daily Trackers List */}
        <ScrollView style={styles.buttonsContainer}>
          {/* Screen Time*/}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/screen-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Screen Time</Text>
              <Text style={styles.trackerDescription}>5hrs</Text>
              </View>
            </View> 
            </View>

            {/* Sleep*/}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/sleep-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Sleep</Text>
              <Text style={styles.trackerDescription}>{sleepHoursTotal} {sleepHoursTotal === 1 ? 'hour' : 'hours'} and {sleepMinsTotal} {sleepMinsTotal === 1 ? 'minute' : 'minutes'}</Text>
              </View>
            </View> 
            </View>

            {/* Physical */}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/physical-activity.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Physical Activity</Text>
              <Text style={styles.trackerDescription}>{physicalActivityHoursTotal} {physicalActivityHoursTotal === 1 ? 'hour' : 'hours'} and {physicalActivityMinsTotal} {physicalActivityMinsTotal === 1 ? 'minute' : 'minutes'}</Text>
              </View>
            </View> 
            </View>

            {/* Social */}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/social-interaction.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Social Interaction</Text>
              <Text style={styles.trackerDescription}>1hr and 26min</Text>
              </View>
            </View> 
            </View>

            {/* Caffeine Consumption */}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/caffeine-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Caffeine Consumption</Text>
              <Text style={styles.trackerDescription}>{caffeineTotal}mg</Text>
              </View>
            </View> 
            </View>

            {/* Water Intake */}
            <View
              style={styles.buttonTracker}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/water-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Water Intake</Text>
              <Text style={styles.trackerDescription}>{waterIntakeTotal} cups</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  welcomeBar: {
    width: '100%',
    height: 160,
    backgroundColor: '#4B3425',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  localDate: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 10,
    left: -27,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'ProtestRiot-Regular',
    textAlign: 'center',
  },
  welcomeTextContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  bodyText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center',
  },
  dailyContainer: {
    width: '90%',
    top: -40,
  },
  buttonsContainer: {
    width: '100%',
    top: - 40
  },
  buttonTracker: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 31,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  checkin: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#6D4B36',
    fontSize: 16,
    marginleft: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  sameRow: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: -25,
  },
  icon: {
    marginRight: 4,
    marginLeft: 5,
    marginTop: 5,
  },
  greenButton: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -23,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#6D4B36',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start', 
  },
  trackerDescription: {
    color: '#878E96',
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'left',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  buttonTextContainer: {
    alignContent: 'left',
    marginLeft: 18,
    justifyContent: 'center',
    flex: 1, 
  },
});

export default HomeScreen;