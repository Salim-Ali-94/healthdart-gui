import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OpenOrdersScreen from "../screens/OpenOrdersScreen";
import SubmittedOrdersScreen from "../screens/SubmittedOrdersScreen";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as constants from "../utils/constants"; 


const getFonts = () => {

  return Font.loadAsync({

    "montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserratMedium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "montserratBold": require("../assets/fonts/Montserrat-Bold.ttf")
  })

}


const Tab = createMaterialTopTabNavigator();

export default function NestedTabs({item}) {

  const [fontsLoadedFlag, setFontsLoadedFlag] = useState(false);
  const navigation = useNavigation();
  
  const tabNavigatorSettings = { 

    tabBarActiveTintColor: "#000", 
    tabBarInActiveTintColor: "#000", 
    tabBarStyle: { backgroundColor: "#fff", paddingTop: 10, paddingBottom: 10 }, 
    tabBarLabelStyle: { fontWeight: "bold" }, 
    tabBarIndicatorStyle: { backgroundColor: "#fff" } 
  };

  const openOrdersScreenSettings = { 

    tabBarBadge: () => {

      return (

        <View style={styles.notificationDot}>

          <Text style={styles.notificationText}>0</Text>

        </View>

      )

    },

    tabBarLabel: ({focused}) => {

      return (

        <View style={[styles.ordersTab, {paddingLeft: 20, paddingRight: 20, backgroundColor: focused ? constants.selectedGrey : "#fff"}]}>

          <Text style={[styles.ordersHeading, {color: focused ? "#000" : "gray", fontFamily: focused ? "montserratMedium" : "montserrat" }]}>Open orders</Text>

        </View>

      ) 

    }

  };

  const submittedOrdersSettings = { 

    tabBarLabel: ({focused}) => {

      return (

        <View style={[styles.ordersTab, {marginRight: 30, width: 185, backgroundColor: focused ? constants.selectedGrey : "#fff"}]} >

          <Text style={[styles.ordersHeading, {textAlign: "center", color: focused ? "#000" : "gray", fontFamily: focused ? "montserratMedium" : "montserrat" }]}>Submitted orders</Text>

        </View>) 
      }

  };

  if (fontsLoadedFlag) {

    return (

      <Tab.Navigator screenOptions={tabNavigatorSettings}>
         
          <Tab.Screen name="Open" component={OpenOrdersScreen} options={openOrdersScreenSettings} />
          <Tab.Screen name="Submit" navigation={navigation} children={()=> <SubmittedOrdersScreen selected={item} /> } options={submittedOrdersSettings} />

      </Tab.Navigator>

    );

  } else {

      return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoadedFlag(true)} />);
  }

}




const styles = StyleSheet.create({

  notificationDot: {

    position: "absolute", 
    backgroundColor: constants.statusPink,
    top: 2, 
    right: 18, 
    padding: 2, 
    borderRadius: 50, 
    width: 20, 
    height: 20, 
    justifyContent: "center"
  },

  notificationText: {

    fontFamily: "montserratBold", 
    color: "#fff", 
    textAlign: "center", 
    fontSize: 10
  },

  ordersTab: {

    borderRadius: 50, 
    paddingTop: 5, 
    paddingBottom: 5
  },

  ordersHeading: {

    fontSize: 20
  }

});