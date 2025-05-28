import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from "react-native"
import React from 'react'
import Timer from '../components/Timer'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from "../context/AuthContext";

interface SettingItemProps {
  icon: React.ReactNode
  title: string
  isActive?: boolean
  onPress: () => void
}

const SettingItem = ({ icon, title, isActive = false, onPress }: SettingItemProps) => (
  <TouchableOpacity
    style={[styles.settingItem, isActive && styles.settingItemActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.settingItemLeft}>
      {icon}
      <Text style={styles.settingItemText}>{title}</Text>
    </View>
  </TouchableOpacity>
)

const Profile = ({ timeLeft, formatTime, isTimedOut }) => {

  const [activeItem, setActiveItem] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const { onLogout } = useAuth();

  const logout = async () => {
    const response = await onLogout();
    if (response && response.error) {
      alert("Login failed:", response.error_description);
    }
  }

  const handleSettingPress = (setting: string) => {
    setActiveItem(setting)
    console.log(`Pressed ${setting}`)
  }

  const handleLogout = () => {
    console.log("Logout pressed")
    // Handle logout logic
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" color="#999" size={16} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          <SettingItem
            icon={<Icon name="person-add" color="#555" size={20} />}
            title="Follow and invite friends"
            isActive={activeItem === "Follow and invite friends"}
            onPress={() => handleSettingPress("Follow and invite friends")}
          />
          <SettingItem
            icon={<Icon name="notifications" color="#555" size={20} />}
            title="Notifications"
            isActive={activeItem === "Notifications"}
            onPress={() => handleSettingPress("Notifications")}
          />
          <SettingItem
            icon={<Icon name="lock" color="#555" size={20} />}
            title="Privacy"
            isActive={activeItem === "Privacy"}
            onPress={() => handleSettingPress("Privacy")}
          />
          <SettingItem
            icon={<Icon name="security" color="#555" size={20} />}
            title="Supervision"
            isActive={activeItem === "Supervision"}
            onPress={() => handleSettingPress("Supervision")}
          />
          <SettingItem
            icon={<Icon name="warning" color="#555" size={20} />}
            title="Security"
            isActive={activeItem === "Security"}
            onPress={() => handleSettingPress("Security")}
          />
          {/* <SettingItem
            icon={<Icon name="attach-money" color="#555" size={20} />}
            title="Ads"
            isActive={activeItem === "Ads"}
            onPress={() => handleSettingPress("Ads")}
          />
          <SettingItem
            icon={<Icon name="person" color="#555" size={20} />}
            title="Account"
            isActive={activeItem === "Account"}
            onPress={() => handleSettingPress("Account")}
          />
          <SettingItem
            icon={<Icon name="help" color="#555" size={20} />}
            title="Help"
            isActive={activeItem === "Help"}
            onPress={() => handleSettingPress("Help")}
          />
          <SettingItem
            icon={<Icon name="info" color="#555" size={20} />}
            title="About"
            isActive={activeItem === "About"}
            onPress={() => handleSettingPress("About")}
          />
          <SettingItem
            icon={<Icon name="dark-mode" color="#555" size={20} />}
            title="Theme"
            isActive={activeItem === "Theme"}
            onPress={() => handleSettingPress("Theme")}
          /> */}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerBranding}>
            <Text style={styles.footerLogo}>Mindful</Text>
            <Text style={styles.footerText}>Educational Centre</Text>
          </View>
          <Text style={styles.footerDescription}>Control settings for connected experiences across Mindful apps</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Icon name="logout" color="#FF3B30" size={20} />
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  profileContainer: {
    paddingTop: 26,
    alignItems: "center",
    paddingVertical: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#e91e63",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  settingsContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderRadius: 8,
  },
  settingItemActive: {
    // backgroundColor: "#e8f5e9",
    // borderWidth: 1,
    // borderColor: "#4caf50",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#333",
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 16,
  },
  footerBranding: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footerLogo: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  footerDescription: {
    fontSize: 12,
    color: "#999",
    lineHeight: 18,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginTop: 16,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
})