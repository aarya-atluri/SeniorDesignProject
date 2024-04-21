import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase/firebaseConfig';

import { user } from './CompleteSetup';

import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase/firebaseConfig';

import { user } from './CompleteSetup';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, userData.email)
      .then(() => {
        Alert.alert("Check your email", "A password reset link has been sent to your email.");
      })
      .catch((error) => {
        console.error("Failed to send password reset email:", error);
        Alert.alert("Error", error.message);
      });
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

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Text style={styles.infoLabel}>Email: {userData ? userData.email : 'linmadi61@gmail.com'}</Text>
      <Text style={styles.infoLabel}>Name: {userData ? userData.name: 'Lindsey'}</Text>
      <Text style={styles.infoLabel}>Age: {userData ? userData.age: 21}</Text>
      <Text style={styles.infoLabel}>Gender: {userData ? userData.gender: 'female'}</Text>

      <Button
        title="Send Password Reset Email"
        onPress={handlePasswordReset}
        color="#4f3422"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  infoLabel: {
    fontSize: 18,
    marginVertical: 8
  },
  button: {
    marginTop: 20,
    color: 'blue' 
  }
});

export default ProfileScreen;
