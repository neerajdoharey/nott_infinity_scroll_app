import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal, Pressable } from 'react-native'
import { useState, useEffect } from "react"
import React from 'react'

import Avatar from './Avatar'

// Sample data for categories
const categories = [
  {
    id: 1,
    name: "Space",
    image: "https://img.freepik.com/premium-photo/star-field-background-starry-outer-space-background-texture_78899-1015.jpg?semt=ais_hybrid&w=740",
    storyImage: "https://img.freepik.com/premium-photo/star-field-background-starry-outer-space-background-texture_78899-1015.jpg?semt=ais_hybrid&w=740",
    fact: "Saturn's rings are mostly made of ice particles, with a small amount of rocky debris and dust.",
  },
  {
    id: 2,
    name: "Ocean",
    image: "https://rea.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2022-06/shutterstock_1529923664.jpg?itok=0wsT0fLJ",
    storyImage: "https://rea.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2022-06/shutterstock_1529923664.jpg?itok=0wsT0fLJ",
    fact: "The ocean contains 97% of Earth's water and covers more than 70% of the Earth's surface.",
  },
  {
    id: 3,
    name: "History",
    image: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/history-in-education.jpg",
    storyImage: "https://www.euroschoolindia.com/blogs/wp-content/uploads/2023/08/history-in-education.jpg",
    fact: "The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
  },
  {
    id: 4,
    name: "Animals",
    image: "https://hips.hearstapps.com/hmg-prod/images/baby-animals-meerkat-65f8b06b8d42a.jpg?crop=0.668xw:1.00xh;0.179xw,0&resize=980:*",
    storyImage: "https://hips.hearstapps.com/hmg-prod/images/baby-animals-meerkat-65f8b06b8d42a.jpg?crop=0.668xw:1.00xh;0.179xw,0&resize=980:*",
    fact: "Octopuses have three hearts, nine brains, and blue blood.",
  },
  {
    id: 5,
    name: "Plants",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg/960px-Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg",
    storyImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg/960px-Fr%C3%BChling_bl%C3%BChender_Kirschenbaum.jpg",
    fact: "Bamboo can grow up to 35 inches in a single day, making it one of the fastest-growing plants.",
  },
]

const Category = () => {
  const [selectedStory, setSelectedFact] = useState<null | (typeof categories)[0]>(null)
  const [modalVisible, setModalVisible] = useState(false)

  // Handle fact press
  const handleFactPress = (item: (typeof categories)[0]) => {
    setSelectedFact(item)
    setModalVisible(true)
  }

  // Render fact item
  const renderFactItem = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity style={styles.storyItem} onPress={() => handleFactPress(item)}>
      <Avatar size="large" source={item.image} fallback={item.name.substring(0, 2)} hasRing={true} />
      <Text style={styles.storyName}>{item.name}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.catcontainer}>
      <FlatList
        data={categories}
        renderItem={renderFactItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContainer}
      />

      {/* Modal for displaying the story */}
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.fullScreenModal}>
          {selectedStory && (
            <>
              <Image 
                source={{ uri: selectedStory.storyImage }} 
                style={styles.fullScreenImage}
                resizeMode="cover"
              />
              <View style={styles.modalHeader}>
                <Text style={styles.headerText}>Candid</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeText}>✕</Text>
                </Pressable>
              </View>
              <View style={styles.modalContent}>
                <View style={styles.userInfo}>
                  <Text style={styles.username}>stellas_gr00v3</Text>
                  <Text style={styles.time}>10m</Text>
                </View>
                <Text style={styles.caption}>One take</Text>
                <Text style={styles.fact}>{selectedStory.fact}</Text>
              </View>
              <View style={styles.messageInputContainer}>
                <Text style={styles.messageInput}>Send message</Text>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
  catcontainer: {
    flex: 1,
  },
  storyItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  storyName: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  storiesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    color: 'white',
    fontSize: 24,
  },
  modalContent: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
  },
  caption: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  fact: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  messageInputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    borderRadius: 20,
    zIndex: 1,
  },
  messageInput: {
    color: 'white',
    fontSize: 16,
    opacity: 0.7,
  },
})