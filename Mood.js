import React from 'react';
import { Image, StyleSheet } from 'react-native';

const moodSvgMap = {
  excited: require('./assets/images/excited.svg'),
  happy: require('./assets/images/happy.svg'),
  meh: require('./assets/images/meh.svg'),
  sad: require('./assets/images/sad.svg'),
  dead: require('./assets/images/dead.svg'),
};

const MoodImage = ({ mood, style }) => {
  // Convert mood to lowercase
  const moodLowerCase = mood.toLowerCase();

  // Check if the mood exists in the map
  if (moodSvgMap[moodLowerCase]) {
    return (
      <Image
        source={moodSvgMap[moodLowerCase]}
        style={[styles.icon, style]}
      />
    );
  } else {
    // Return a default image or null if the mood doesn't exist
    return (
    <Image
        source={require('./assets/images/happy.svg')}
        style={[styles.icon, style]}
    />
    );
  }
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 4,
        marginLeft: 5,
        marginTop: 5,
    },
  });

export default MoodImage;
