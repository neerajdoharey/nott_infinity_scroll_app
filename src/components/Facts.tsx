import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList, Animated, Easing } from 'react-native'
import React from 'react'
import { useState, useEffect, useRef } from "react"

import Avatar from './Avatar'
import Category from './Category'
import Icon from 'react-native-vector-icons/MaterialIcons';

// Sample data for educational facts
const facts = [
  {
    id: 1,
    image: "https://cdn.britannica.com/64/155864-050-34FBD7A2/view-Great-Barrier-Reef-Australia-coast.jpg",
    fact: "The Great Barrier Reef is the world's largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers.",
    category: "Nature",
    likes: 342,
  },
  {
    id: 2,
    image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:91,cw:1440,ch:1080,q:80,w:1440/e3VZtcLnD3ExmoEVWFyLdY.jpg",
    fact: "The human brain has the capacity to store approximately 2.5 petabytes of information, equivalent to 3 million hours of TV shows.",
    category: "Science",
    likes: 219,
  },
  {
    id: 3,
    image: "https://www.planetware.com/photos-large/F/eiffel-tower.jpg",
    fact: "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion, meaning the iron expands in the heat.",
    category: "Architecture",
    likes: 187,
  },
]

const Facts = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [lastTap, setLastTap] = useState<number | null>(null)
  const heartScale = useRef(new Animated.Value(0)).current
  const heartOpacity = useRef(new Animated.Value(0)).current

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const animateHeart = () => {
    heartOpacity.setValue(1)
    heartScale.setValue(0)
    
    Animated.parallel([
      Animated.timing(heartScale, {
        toValue: 1.5,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(heartOpacity, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start()
  }

  const handleDoubleTap = (postId: number) => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
  
  if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
    // Only like if not already liked
    if (!likedPosts.includes(postId)) {
      handleLike(postId)
      animateHeart()
    }
  } else {
    setLastTap(now)
  }
}

  const renderFactItem = ({ item }: { item: (typeof facts)[0] }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Avatar size="small" fallback={item.category.substring(0, 2)} />
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => handleDoubleTap(item.id)}
        >
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </TouchableOpacity>
        <Animated.View style={[
          styles.heartOverlay,
          {
            transform: [{ scale: heartScale }],
            opacity: heartOpacity,
          }
        ]}>
          <Icon name="favorite" size={60} color="#ff3b30" />
        </Animated.View>
      </View>

      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Icon 
            name={likedPosts.includes(item.id) ? "favorite" : "favorite-border"} 
            size={24} 
            color={likedPosts.includes(item.id) ? "#ff3b30" : "#000"} 
          />
        </TouchableOpacity>
        <Text style={styles.likesText}>{likedPosts.includes(item.id) ? item.likes + 1 : item.likes} likes</Text>
      </View>

      <Text style={styles.factText}>{item.fact}</Text>
    </View>
  )

  return (
    <FlatList
      data={facts}
      renderItem={renderFactItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <Category />
      }
      contentContainerStyle={styles.contentContainer}
    />
  )
}

export default Facts

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 16,
    paddingBottom: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryText: {
    fontWeight: "500",
    marginLeft: 8,
  },
  postImage: {
    width: width,
    height: width,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  likesText: {
    fontSize: 14,
    marginLeft: 8,
  },
  factText: {
    fontSize: 14,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  likeButton: {
    padding: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  heartOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30, // Half of icon size
    marginTop: -30,  // Half of icon size
  }
})