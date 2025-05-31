import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Avatar = ({
  size = "medium",
  source,
  fallback,
  hasRing = false,
}: {
  size?: "small" | "medium" | "large"
  source?: string
  fallback: string
  hasRing?: boolean
}) => {
  const sizeMap = {
    small: 32,
    medium: 40,
    large: 64,
  }

  const avatarSize = sizeMap[size]

  return (
    <View style={[styles.avatar, { width: avatarSize, height: avatarSize }, hasRing && styles.avatarRing]}>
      {source ? (
        <Image source={{ uri: source }} style={{ width: "100%", height: "100%", borderRadius: avatarSize / 2 }} />
      ) : (
        <View style={[styles.avatarFallback, { width: avatarSize, height: avatarSize }]}>
          <Text style={styles.avatarFallbackText}>{fallback}</Text>
        </View>
      )}
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  avatarRing: {
    borderWidth: 2,
    borderColor: "#e91e63",
  },
  avatarFallback: {
    borderRadius: 100,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFallbackText: {
    color: "#fff",
    fontWeight: "bold",
  }
})