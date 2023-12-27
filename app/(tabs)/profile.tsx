import { View, Text, Button } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'

const Profile = () => {
  const {signOut,isSignedIn} = useAuth()
  return (
    <View>
      <Button title='LogOut' onPress={()=> signOut()}/>
      {!isSignedIn && (  //if user is not signed in reroute to login modal
        <Link href={'/(modals)/login'}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  )
}

export default Profile