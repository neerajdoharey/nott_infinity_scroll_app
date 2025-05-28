import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom Progress component
const Progress = ({ value }: { value: number }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${value}%` }]} />
    </View>
  );
};

const Timer = ({ timeLeft, formatTime }) => {
  const initialTime = 600; // 10 minutes in seconds
  const timePercentage = (timeLeft / initialTime) * 100;

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerHeader}>
        <Text style={styles.timerLabel}>Time remaining today</Text>
        <View style={styles.timerValue}>
          <Icon name="timer" size={16} color="#000" />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>
      </View>
      <Progress value={timePercentage} />
    </View>
  );
};

export default Timer

const styles = StyleSheet.create({
  timerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    // For fixed positioning:
    position: "relative",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timerLabel: {
    fontSize: 12,
    color: "#666",
  },
  timerValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  progressContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#e91e63",
    borderRadius: 4,
  }
})