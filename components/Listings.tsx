import { View, Text, ListRenderItem, TouchableOpacity, StyleSheet,  Image} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import  Animated, { FadeInLeft, FadeInRight, FadeOut, FadeOutLeft } from 'react-native-reanimated';

type Props ={
  listings: any[];
  category: string
}

//to add animation to the list install reactnative reanimated.

const Listings = ({listings: items, category}: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null) // help to scroll the list
  useEffect(()=> {
    console.log("Reload listing", items.length);
    setLoading(true)

     setTimeout(()=>{
      setLoading(false )
     }, 2000)
    
  }, [category])

  //Takes an item from data and renders it into the list.
  // expo router Link, if you add elements in the Link tag, always add asChild else the items will not display
const renderRow: ListRenderItem<any> = ({item}) => (
  <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
      <Image source={{uri: item.medium_url}} style={styles.image}/>
      <TouchableOpacity style={{position: "absolute", top: 30, right: 30}}>
        <Ionicons name='heart-outline' size={24} color={"#000"}/>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: "space-between", }}>
        <Text style={{fontFamily: "mon-sb"}}>{item.name}</Text>
        <View style={{flexDirection: 'row', gap: 4}}>
          <Ionicons name='star' size={16}/>
          <Text style={{fontFamily: "mon-sb"}}>{item.review_scores_rating/20}</Text>
        </View>
      </View>

      <Text style={{fontFamily: 'mon'}}>{item.room_type}</Text>

      <View style={{flexDirection: "row", gap: 4}}>
        <Text style={{fontFamily: "mon-sb"}}>€{item.price}</Text>
        <Text  style={{fontFamily: 'mon'}}>night</Text>
      </View>
      </Animated.View>
    </TouchableOpacity>
  </Link>
)

  return (
    <View style={defaultStyles.container}>
      <FlatList
      renderItem={renderRow}
        data={loading ? [] : items}
        ref = {listRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding : 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  }
})

export default Listings