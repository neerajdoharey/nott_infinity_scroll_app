"use client"
import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, TextInput } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useAuth } from "../context/AuthContext";
import Snackbar from "react-native-snackbar";


const OTPVerificationScreen = ({ navigation, onBack }: { navigation?: any; onBack?: () => void }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<TextInput[]>([])
  const { userInfo, newOtp, verfiyCode } = useAuth();


  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setCanResend(true)
    }
  }, [timer])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      console.log("Go back")
    }
  }

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return

    const newOtpCode = [...otp]
    newOtpCode[index] = value

    setOtp(newOtpCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      const response = await verfiyCode!(otpCode);
      
      if (response?.success) {
        navigation.navigate('Home'); 
      }
    } else {
      Snackbar.show({
        text: "Please enter complete OTP",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      console.log("Resend OTP")
      setTimer(60)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      inputRefs.current[0]?.focus()
      generateOtp()
    }
  }

  const generateOtp = async () => {
    const response = await newOtp!()
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VERIFICATION</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="message" size={40} color="#6B9EFF" />
          </View>
        </View>

        {/* Title and Description */}
        <Text style={styles.title}>Enter verification code</Text>
        <Text style={styles.description}>
          We have sent a 6-digit verification code to{"\n"}
          <Text style={styles.phoneNumber}>{userInfo?.email}</Text>
        </Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref
              }}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : {},
                index === otp.findIndex((d) => d === "") ? styles.otpInputActive : {},
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {canResend ? "You can resend code now" : `Resend code in ${formatTime(timer)}`}
          </Text>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, isOtpComplete && styles.verifyButtonActive]}
          onPress={handleVerify}
          disabled={!isOtpComplete}
        >
          <Text style={[styles.verifyButtonText, isOtpComplete && styles.verifyButtonTextActive]}>VERIFY CODE</Text>
        </TouchableOpacity>

        {/* Resend Button */}
        <TouchableOpacity
          style={[styles.resendButton, canResend && styles.resendButtonActive]}
          onPress={handleResendOTP}
          disabled={!canResend}
        >
          <Text style={[styles.resendButtonText, canResend && styles.resendButtonTextActive]}>RESEND CODE</Text>
        </TouchableOpacity>

        {/* Help Text */}
        <Text style={styles.helpText}>
          Didn't receive the code?{" "}
          <Text style={styles.helpLink} onPress={() => console.log("Contact support")}>
            Contact support
          </Text>
        </Text>

        {/* Footer Links */}
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => console.log("Terms of use")}>
            <Text style={styles.footerLink}>Terms of use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Privacy Policy")}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Contact")}>
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
  backButton: {
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
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B9EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  phoneNumber: {
    fontWeight: "600",
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otpInputFilled: {
    borderColor: "#6B9EFF",
    backgroundColor: "#F0F4FF",
  },
  otpInputActive: {
    borderColor: "#6B9EFF",
    borderWidth: 2,
  },
  timerContainer: {
    marginBottom: 32,
  },
  timerText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  verifyButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  verifyButtonActive: {
    backgroundColor: "#6B9EFF",
    shadowColor: "#6B9EFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  verifyButtonTextActive: {
    color: "#FFFFFF",
  },
  resendButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: "center",
    marginBottom: 32,
    width: "100%",
  },
  resendButtonActive: {
    borderColor: "#6B9EFF",
  },
  resendButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  resendButtonTextActive: {
    color: "#6B9EFF",
  },
  helpText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 48,
  },
  helpLink: {
    color: "#6B9EFF",
    textDecorationLine: "underline",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    width: "100%",
  },
  footerLink: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "underline",
  },
})

export default OTPVerificationScreen
