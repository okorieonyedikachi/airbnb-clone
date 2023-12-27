import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";

enum Strategy {
    Google = 'oauth_google',
    Apple = "oauth_apple",
    Facebook = "oauth_facebook"
}

const LoginPage = () => {
    const {startOAuthFlow: googleAuth} = useOAuth({strategy:'oauth_google'})
    const {startOAuthFlow: appleAuth} = useOAuth({strategy:'oauth_apple'})
    const {startOAuthFlow: facebookAuth} = useOAuth({strategy:'oauth_facebook'})

    const onSelectAuth = async (strategy: Strategy) => {
        // when google, apple or fb btn is clicked, the respective auth should be should be carried out.
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth
        }[strategy];
        
        try {
            const { createdSessionId, setActive} = await selectedAuth()
            console.log("This is the created session id", createdSessionId);
            if (createdSessionId) { //if sessionid is created then the user is authenticated
                setActive!({session: createdSessionId}) 
                router.back()
            }
        } catch (err) {
            console.error("OAuth error:",err);
            
        }
    }
  return (
    //View tag has a closing tag if its a parent components wrapping its children(which are self closing tags)
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}> 
        <View style= {{flex:1, borderBottomColor: "#000", borderBottomWidth: StyleSheet.hairlineWidth}}/>
            <Text style={styles.separator}>or</Text>
        <View style= {{flex:1, borderBottomColor: "#000", borderBottomWidth: StyleSheet.hairlineWidth}}/>
      </View>
      
      <View style={{gap:20}}>
        <TouchableOpacity style={styles.btnOutline}>
            <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText }>Continue with Phone </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=> {onSelectAuth(Strategy.Apple)}}>
            <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
            <Text style={styles.btnOutlineText }>Continue with Apple </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=> {onSelectAuth(Strategy.Google)}}>
            <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText }>Continue with Google </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOutline} onPress={()=> {onSelectAuth(Strategy.Facebook )}}>
            <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon}/>
            <Text style={styles.btnOutlineText }>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: " #fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30
  },
  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
export default LoginPage;
