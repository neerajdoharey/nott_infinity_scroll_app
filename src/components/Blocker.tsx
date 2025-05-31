import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Blocker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.timedOutContainer}>
        <Text style={styles.timedOutTitle}>Daily Limit Reached</Text>
        <Text style={styles.timedOutMessage}>
          You've used your 10 minutes for today. Come back tomorrow for more educational content!
        </Text>
        <Icon name="menu-book" size={64} color="#999" />
        <Text style={styles.timedOutSuggestion}>
          Time spent mindfully is time well spent. Why not read a book or go for a walk?
        </Text>
      </View>
    </View>
  )
}

export default Blocker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timedOutContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  timedOutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  timedOutMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  timedOutSuggestion: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
  }
})