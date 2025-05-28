import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Home';
import Shreels from '../screens/Shreels';
import Profile from '../screens/Profile';

import useTimer from '../services/useTimer';

const Tab = createBottomTabNavigator();

const AppStack = () => {
  const { timeLeft, formatTime, isTimedOut, resetTimer, pauseTimer, resumeTimer } = useTimer(600);
  
  const screenProps = {
    timeLeft,
    formatTime,
    isTimedOut,
    resetTimer,
    pauseTimer,
    resumeTimer
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black', // Active tab color
        tabBarInactiveTintColor: 'darkgrey', // Inactive tab color
      }}
    >
      <Tab.Screen 
        name="Home" 
        children={() => <Home {...screenProps} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Shreels" 
        children={() => <Shreels {...screenProps} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="movie" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        children={() => <Profile {...screenProps} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})