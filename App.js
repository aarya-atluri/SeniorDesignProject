import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screen components
import HomeScreen from './HomeScreen';
import JournalScreen from './JournalScreen';
import ProfileScreen from './ProfileScreen';
import HealthScreen from './HealthScreen';
import CalendarScreen from './CalendarScreen';
import SpecificEntry from './SpecificEntry';
import SignUpScreen from './SignUpScreen';
import SignUpDetails from './SignUpDetails';
import SignInDetails from './SignInDetails';
import AgeInfo from './AgeInfo';
import CompleteSetup from './CompleteSetup';

// Create the context
export const AuthContext = createContext();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const JournalStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Calendar" component={CalendarScreen} />
    <Stack.Screen name="Journal" component={JournalScreen} />
    <Stack.Screen name = "SpecificEntry" component= {SpecificEntry} />
  </Stack.Navigator>
);

const AuthStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignUpDetails" component={SignUpDetails} />
    <Stack.Screen name="SignInDetails" component={SignInDetails} />
    <Stack.Screen name="AgeInfo" component={AgeInfo} />
    <Stack.Screen name="CompleteSetup" component={CompleteSetup} />
  </Stack.Navigator>
);

const MainApp = () => (
<Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? 'md-home' : 'md-home-outline';
        } else if (route.name === 'Journal') {
          iconName = focused ? 'md-journal' : 'md-book-outline';
        } else if (route.name === 'Health') {
          iconName = focused ? 'md-data' : 'md-bar-chart-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'md-person' : 'md-body-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Journal" component={JournalStackNavigator} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Health" component={HealthScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <NavigationContainer>
        {isSignedIn ? <MainApp /> : <AuthStackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
