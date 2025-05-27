import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/AuthContext';
import Router from './routers/Router';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})