import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import AuthStack from '../routers/AuthStack'
import AppStack from '../routers/AppStack'
import OtpScreen from '../screens/OtpScreen'

const Router = () => {
  const { authState, onLogout } = useAuth()

  if (authState.authenticated === null) {
    return <Loading />
  }
  { console.log('Auth State:', authState) }
  return (
    <NavigationContainer>
      {authState.authenticated ? (
        authState.verified ? (
          <AppStack />
        ) : (
          <OtpScreen onBack={onLogout}/>
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer >
  )
}

export default Router