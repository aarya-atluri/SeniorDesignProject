import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { auth, db } from './Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

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

  const handlePasswordReset = () => {
    if (auth.currentUser && auth.currentUser.email) {
      sendPasswordResetEmail(auth, auth.currentUser.email)
        .then(() => {
          Alert.alert('Password reset email sent successfully!');
        })
        .catch((error) => {
          console.error('Failed to send password reset email:', error);
          Alert.alert('Error', 'Failed to send password reset email');
        });
    } else {
      Alert.alert('Error', 'No email found for the user');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('./assets/profile-icon.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData ? userData.name : 'Loading...'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoData}>{userData ? userData.email : 'Loading...'}</Text>
        <Text style={styles.infoLabel}>Age:</Text>
        <Text style={styles.infoData}>{userData ? userData.age : 'Loading...'}</Text>
        <Text style={styles.infoLabel}>Gender:</Text>
        <Text style={styles.infoData}>{userData ? userData.gender : 'Loading...'}</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  infoContainer: {
    marginTop: 20
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  },
  infoData: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20
  },
  resetButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16
  }
});

export default ProfileScreen;
