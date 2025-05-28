"use client"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, TextInput } from "react-native"
import Icons from 'react-native-vector-icons/MaterialIcons';

const Signup = ({ navigation, onBack }: { navigation?: any; onBack?: () => void }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      console.log("Go back")
    }
  }

  const handleRegister = () => {
    console.log("Register pressed", { firstName, lastName, email, password, acceptTerms })
    // Handle registration logic
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login pressed`)
    // Handle social login
  }

  const handleFooterLink = (link: string) => {
    console.log(`${link} pressed`)
    // Handle footer link navigation
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.menuButton}>
          {/* <Menu width={24} height={24} stroke="#000" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CREATE ACCOUNT</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Title */}
        <Text style={styles.welcomeTitle}>Welcome to this app</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icons name="email" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icons name="lock-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>REGISTER NOW</Text>
        </TouchableOpacity>

        {/* Terms Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity style={styles.checkbox} onPress={() => setAcceptTerms(!acceptTerms)} activeOpacity={0.7}>
            <View style={[styles.checkboxBox, acceptTerms && styles.checkboxChecked]}>
              {acceptTerms && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
          </TouchableOpacity>
          <Text style={styles.termsText}>Accept all the requirements that we have provided</Text>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("Google")}>
            <Text style={styles.googleIcon}>G</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("Apple")}>
            <Text style={styles.appleIcon}></Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("Twitter")}>
            <Text style={styles.twitterIcon}>🐦</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Links */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => handleFooterLink("Terms of use")}>
            <Text style={styles.footerLink}>Terms of use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFooterLink("Privacy Policy")}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFooterLink("Contact")}>
            <Text style={styles.footerLink}>Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B9EFF",
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginTop: 32,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#6B9EFF",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#6B9EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#DDD",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#6B9EFF",
    borderColor: "#6B9EFF",
  },
  checkboxTick: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDD",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#999",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 48,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4285F4",
  },
  appleIcon: {
    fontSize: 24,
    color: "#000",
  },
  twitterIcon: {
    fontSize: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
  },
  footerLink: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "underline",
  },
})

export default Signup