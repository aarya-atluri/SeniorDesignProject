import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from './Firebase/firebaseConfig'; // Import Firebase 'db' and 'auth'
import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'; // Import Firestore methods

const SpecificEntry = ({ route }) => {
  const [entryData, setEntryData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState(null);
  const { thisEntry } = route.params;
  const navigation = useNavigation();

  // Function to fetch user data from Firestore
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

  // Function to fetch specific journal entry from Firestore
  const fetchEntry = async () => {
    try {
      const entryRef = doc(db, 'users', auth.currentUser.uid, 'journal_entries', thisEntry); // Reference to the specific journal entry document
      const entryDoc = await getDoc(entryRef);
      if (entryDoc.exists()) {
        setEntryData(entryDoc.data());
        //setDate(entryDoc.data().date); // Set the date from the entry document
      } else {
        console.log('Entry not found for the specified date.');
      }
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
    fetchEntry(); // Fetch journal entry data on component mount
  }, [thisEntry]); // Re-run effect when 'thisEntry' changes

  const onPressHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.dateTitle}>Your Entry</Text>
        {entryData && (
          <View style={styles.entryContainer}>
            <Image
              style={styles.image}
              source={
                entryData.mood === 'excited' ? require('./assets/images/excited.jpg') :
                entryData.mood === 'happy' ? require('./assets/images/happy.jpg') :
                entryData.mood === 'meh' ? require('./assets/images/meh.jpg') :
                entryData.mood === 'sad' ? require('./assets/images/sad.jpg') :
                require('./assets/images/dead.jpg')
              }
            />
            <TextInput
              multiline={true}
              defaultValue={entryData.entry}
              style={styles.text}
            />
            {/* Display sleep, caffeine, water, and exercise data from entryData */}
            <Text style={styles.infoText}>Sleep: {entryData.sleep_hours} hours and {entryData.sleep_mins} mins</Text>
            <Text style={styles.infoText}>Caffeine: {entryData.caffeine} mg</Text>
            <Text style={styles.infoText}>Water: {entryData.water} cups</Text>
            <Text style={styles.infoText}>Exercise: {entryData.activity_hours} hours and {entryData.activity_mins} mins</Text>
          </View>
        )}
      </View>
      <View style={styles.button}>
        <Button
          title="Go Back"
          width="150"
          onPress={onPressHandler}
          color="#5d4632"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffff'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingVertical: 20,
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B3425', // brown text color
    marginBottom: 20,
    fontFamily: 'ProtestRiot-Regular',
  },
  entryContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffff', // White background color for entry container
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    width: '80%',
    height: 150,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'ProtestRiot-Regular',
    borderWidth: 1,
    backgroundColor: '#d8e1e9',
    borderColor: '#d8e1e9',
    borderRadius: 15,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'ProtestRiot-Regular',
    color: '#5d4632', // Dark brown text color
  },
  button: {
    marginTop: 20,
    width: 150,
  },
});

export default SpecificEntry;
