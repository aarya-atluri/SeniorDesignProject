// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Test
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ProfileScreen;