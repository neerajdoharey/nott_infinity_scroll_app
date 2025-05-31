import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native'
import React from 'react'
import Facts from '../components/Facts'
import Header from '../components/Header'
import Timer from '../components/Timer'
import Blocker from '../components/Blocker'
Facts
const Home = ({ timeLeft, formatTime, isTimedOut }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      {!isTimedOut ? (
        <View>
          <Timer timeLeft={timeLeft} formatTime={formatTime} />
          <Facts />
        </View>
      ) : (
        <Blocker />
      )}
      
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})