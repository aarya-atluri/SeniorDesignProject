import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './Firebase/firebaseConfig';

import { user } from './CompleteSetup';

const ProfileScreen = () => {

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        Alert.alert("Check your email", "A password reset link has been sent to your email.");
      })
      .catch((error) => {
        console.error("Failed to send password reset email:", error);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Text style={styles.infoLabel}>Email: {user.email}</Text>
      <Text style={styles.infoLabel}>Name: {user.name}</Text>
      <Text style={styles.infoLabel}>Age: {user.age}</Text>
      <Text style={styles.infoLabel}>Gender: {user.gender}</Text>

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
