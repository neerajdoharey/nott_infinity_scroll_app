import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'
import AuthStack from '../routers/AuthStack'
import AppStack from '../routers/AppStack'

const Router = () => {
  const { authState } = useAuth()

  if (authState.authenticated === null) {
    return <Loading />
  }

  return (
    <NavigationContainer>    
      { authState.authenticated ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer >
  )
}

export default Router