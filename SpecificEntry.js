// SpecificEntry.js
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import {auth, db} from './Firebase/firebaseConfig'
import {collection, query, where, doc, getDoc, addDoc} from 'firebase/firestore'

const SpecificEntry =({route}) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const { todayDate } = route.params;
  const navigation =useNavigation();

  const onPressHandler = async () => {
      navigation.goBack();
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entryRef = collection(db, 'journal_entries');
        const q = query(entryRef, where('date', '==', todayDate));
        const querySnapshot = await getDoc(q);

        const entriesData = [];
        querySnapshot.forEach(doc => {
          entriesData.push(doc.data());
        });

      setJournalEntries(entriesData);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, [todayDate]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{todayDate}</Text>
      {journalEntries.map((entry, index) => (
        <View key={index} style = {styles.entryContainer}>
          <Image
          style={styles.image}
          source={
            entry.mood === "excited" ? require('./assets/images/excited.jpg') :
            entry.mood === "happy" ? require('./assets/images/happy.jpg') :
            entry.mood === "meh" ? require('./assets/images/meh.jpg') :
            entry.mood === "sad" ? require('./assets/images/sad.jpg') :
            require('./assets/images/dead.jpg') 
          }
        />
          <TextInput
            multiline = {true}
            defaultvalue = {entry.entry}
            style = {styles.text}
        />
          <Text>Sleep: {entry.sleep}</Text>
          <Text>Caffeine: {entry.caffeine}</Text>
          <Text>Water: {entry.water}</Text>
          <Text>Exercise: {entry.exercise}</Text>
        </View>
      ))}
    </View>
    <View style= {styles.button}>
          <Button 
          title = "Go Back" 
          width = '150'
          onPress={onPressHandler} 
          color='#5d4632' />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    },
    
    sectionTitle: {
      fontSize: 40,
      padding: 50,
      fontWeight: '600',
      fontFamily: 'ProtestRiot-Regular',
      color: '#5d4632',
    },
    entryContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    
    image: {
      width: 60,
      height: 60,
      margin: 5,
      resizeMode: 'contain', // Adjust the resizeMode as per your requirement
    },
    
    subSection: {
      fontSize: 20,
      fontWeight: '600',
      fontFamily: 'ProtestRiot-Regular',
      paddingLeft: 150,
      paddingBottom: 10,
      alignSelf: 'flex-start',
      color: '#5d4632',
    },
    button: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      overflow: 'hidden',
      width: 200,
      height: 40,
      borderRadius: 20,
      fontFamily: 'ProtestRiot-Regular',
      bottom: 40
    },
    text: {
      fontSize: 10,
      width: '80%',
      height: 150,
      padding: 10,
      letterSpacing: 0.25,
      fontFamily: 'ProtestRiot-Regular',
      borderWidth: 1,
      backgroundColor: '#d8e1e9',
      borderColor: '#d8e1e9',
      borderRadius: 15,
    },
    image: {
      width: 50,
      height: 50,
      margin: 5,
      resizeMode: 'contain', // Adjust the resizeMode as per your requirement
    },
  });

export default SpecificEntry;