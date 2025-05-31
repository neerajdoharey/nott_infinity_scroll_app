"use client"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, TextInput } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from "../context/AuthContext";

const Login = ({ navigation }: { navigation?: any}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { onLogin } = useAuth();

  const login = async () => {
    const response = await onLogin!(email, password);
    if (response && response.error) {
      alert("Login failed");
    }
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login pressed`)
    // Handle social login
  }

  const handleFooterLink = (link: string) => {
    console.log(`${link} pressed`)
    // Handle footer link navigation
  }

  const handleForgotPassword = () => {
    console.log("Forgot password pressed")
    // Handle forgot password navigation
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.menuButton}>
          
        </View>
        <Text style={styles.headerTitle}>SIGN IN</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Title */}
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              value={email}
              onChangeText={(text: string ) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              value={password}
              onChangeText={(text: string ) => setPassword(text)}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <MaterialIcons 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={20} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        {/* Remember Me and Forgot Password */}
        <View style={styles.optionsContainer}>
          <View style={styles.rememberMeContainer}>

          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
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
            <MaterialIcons name="google" size={24} color="#4285F4" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("Apple")}>
            <MaterialIcons name="apple" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin("Twitter")}>
            <MaterialIcons name="chat" size={24} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        {/* Create Account Link */}
        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccountText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.createAccountLink}>Create Account</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
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
  eyeIcon: {
    padding: 4,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
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
  rememberMeText: {
    fontSize: 14,
    color: "#666",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#6B9EFF",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#6B9EFF",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#6B9EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
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
    marginBottom: 32,
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
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  createAccountText: {
    fontSize: 14,
    color: "#666",
  },
  createAccountLink: {
    fontSize: 14,
    color: "#6B9EFF",
    fontWeight: "600",
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

export default Login