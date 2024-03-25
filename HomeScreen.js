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
                source={require('./assets/images/happy.jpg')}
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
          <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Text style={styles.titleText}>Daily Check-in</Text>
      <TouchableOpacity
          style={styles.checkin}
          onPress={handleDayPress}
        >
          <Text style={styles.buttonText}>You checked in 1 time today!</Text>
        </TouchableOpacity>

      {/* Buttons List */}
      <ScrollView style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonTracker}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>Mindful Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTracker}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>Mood Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTracker}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>Sleep Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTracker}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>Physical Activity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTracker}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>Social Interaction</Text>
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
    backgroundColor: '#4B3425',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
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
  buttonsContainer: {
    width: '100%',
  },
  buttonTracker: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 15,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  checkin: {
    backgroundColor: '#FFEBC2',
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 15,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#6D4B36',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  },
  icon: {
    marginRight: 4,
    marginLeft: 5,
  },
  greenButton: {
    backgroundColor: '#9BB068',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'#6D4B36',
    marginBottom: 10,
    textAlign: 'left'
  },
});

export default HomeScreen;