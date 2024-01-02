import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import ListingData from "@/assets/data/airbnb-listings.json"

// when a category is clicked on the exploreheader page, the list in listings file is reloded.
// A great way to manage data flow in a react or rn app.
//updating data from child to child component is bad practice .
// It is better to go through the parent component and the parent handle the update of the child component
// Like how categiry is updated and passed as props.
const Index = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(()=> ListingData as any, [])
  // listen to category change when pressed
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Index;
