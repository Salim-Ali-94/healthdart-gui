import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";


const getFonts = () => {

  return Font.loadAsync({

    "montserratBold": require("../assets/fonts/Montserrat-Bold.ttf")
  })

};


export default function CustomButton({text, colour, length, pressHandler}) {

  const [fontsLoadedFlag, setFontsLoadedFlag] = useState(false);

  if (fontsLoadedFlag) {

    return (

      <TouchableOpacity style={{ width: length, marginBottom: 10 }} onPress={pressHandler}>

        <View style={[styles.buttonContainer, {backgroundColor: colour}]}>

          <Text style={styles.buttonText}>{text}</Text>

        </View>

      </TouchableOpacity>

    );

  } else {

      return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoadedFlag(true)} />);
  }

}




const styles = StyleSheet.create({

  buttonContainer: { 

    borderRadius: 5,
    paddingVertical: 14,
    paddingHorizontal: 10
  },

  buttonText: { 

    color: "#000",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "montserratBold"
  }

});
