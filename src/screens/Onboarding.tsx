import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Onboarding = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/images/infinie_logo.png')} 
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#20315f',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Ensure full width
  },
  image: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
  },
  button: {
    backgroundColor: '#6B9EFF',
    padding: 20,
    width: '90%',
    borderRadius: 25,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#6B9EFF",
    elevation: 4,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    paddingVertical: 16
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    // fontFamily: 'Roboto-MediumItalic',
  }
});

export default Onboarding;