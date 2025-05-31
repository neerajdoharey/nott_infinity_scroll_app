import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const Header = () => {
  return (
    <View style={styles.header}>
      <Image 
        source={require('../../assets/images/infinie_logo.png')} // Adjust path to your image
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="add-box" size={22} color="" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="favorite-border" size={22} color="" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="forum" size={22} color="" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rightSection: {
    flexDirection: "row",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "500",
    // fontStyle: "italic",
  },
  logoImage: {
    width: 40, // Adjust as needed
    height: 40,  // Adjust as needed
  },
  iconButton: {
    padding: 4,
  },
})