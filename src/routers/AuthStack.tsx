import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
//Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"

// screens
import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})