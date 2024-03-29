import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  // Function to get the local date
  const getLocalDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

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
            <Text style={styles.welcomeText}>Hi, Thomaz!</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require('./assets/fire-icon.svg')}
                style={styles.icon}
              />
              <Text style={styles.bodyText}>365</Text>
              <Image
                source={require('./assets/images/happy-icon.svg')}
                style={styles.icon}
              />
              <Text style={styles.bodyText}>Happy</Text>
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
            style={styles.checkin}
            onPress={handleDayPress}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonTextContainer}>
                <Text style={styles.buttonText}>You checked in 1 time today!</Text>
                <Text style={styles.buttonText}>Your mood was: Happy</Text>
              </View>
              <Image
                source={require('./assets/images/happy-icon.svg')}
                style={[styles.icon, { width: 70, height: 70}]}
              />
            </View> 
            
          </TouchableOpacity>
      

        <Text style={styles.titleText}>Daily Trackers</Text>
      </View>

        {/* Buttons List */}
        <ScrollView style={styles.buttonsContainer}>
          {/* Journal*/}
            <TouchableOpacity
              style={styles.buttonTracker}
              onPress={() => navigation.navigate('Journal')}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/journal.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Mindful Journal</Text>
              <Text style={styles.trackerDescription}>5 entries this week</Text>
              </View>
            </View> 
            </TouchableOpacity>

            {/* Mood*/}
            <TouchableOpacity
              style={styles.buttonTracker}
              onPress={() => navigation.navigate('Journal')}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/mood-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Mood Tracker</Text>
              <Text style={styles.trackerDescription}>Week average: happy</Text>
              </View>
            </View> 
            </TouchableOpacity>

            {/* Sleep*/}
            <TouchableOpacity
              style={styles.buttonTracker}
              onPress={() => navigation.navigate('Journal')}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/sleep-tracker.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Sleep</Text>
              <Text style={styles.trackerDescription}>5hr and 29min</Text>
              </View>
            </View> 
            </TouchableOpacity>

            {/* Physical */}
            <TouchableOpacity
              style={styles.buttonTracker}
              onPress={() => navigation.navigate('Journal')}
            >
            <View style={styles.buttonContent}>
              <Image
                source={require('./assets/physical-activity.svg')}
                style={styles.icon}
              />
              <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Physical Activity</Text>
              <Text style={styles.trackerDescription}>37 minutes</Text>
              </View>
            </View> 
            </TouchableOpacity>

            {/* Social */}
            <TouchableOpacity
              style={styles.buttonTracker}
              onPress={() => navigation.navigate('Journal')}
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
            </TouchableOpacity>
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
    backgroundColor: '#FFEBC2',
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