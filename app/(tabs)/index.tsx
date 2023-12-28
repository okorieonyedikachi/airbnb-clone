import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'

// when a category is clicked on the exploreheader page, the list in listings file is reloded

const Index = () => {
  const [category, setCategory] = useState('Tiny homes')
  // listen to category change when pressed
  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (
    <View style={{flex:1}}>
      <Stack.Screen options={{header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>}}/>
      <Listings listings={[]} category={category}/>
    </View>
  )
}

export default Index