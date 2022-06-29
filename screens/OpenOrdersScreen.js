import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import * as constants from "../utils/constants";


const getFonts = () => {

  return Font.loadAsync({

    "montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserratSemibold": require("../assets/fonts/Montserrat-SemiBold.ttf")
  })

}


export default function OpenOrders() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {

    return (

      <View style={styles.screenContainer}>

        <View style={styles.orderContainer}>
    
          <Text style={styles.openOrders}>Open Orders</Text>

        </View>

        <View style={styles.infoContainer}>

          <Text style={styles.infoText}>You have no open orders</Text>

        </View>

        <CustomButton length={"40%"} text={"Go to shop"} colour={constants.buttonYellow} pressHandler={() => alert("I'm sorry Dave, I'm afraid I cannot do that")} />

      </View>

    );

  } else {

        return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />);
  }

}




const styles = StyleSheet.create({

  screenContainer: { 

    paddingTop: 10, 
    paddingLeft: 10, 
    flex: 1, 
    backgroundColor: "white" 
  },

  orderContainer: { 

    paddingBottom: 30 
  },

  openOrders: { 

    fontSize: 30, 
    paddingTop: 20,
    fontFamily: "montserratSemibold"
  },

  infoContainer: { 

    paddingBottom: 20 
  },

  infoText: { 

    fontFamily: "montserrat"

  }

});

