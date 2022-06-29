import React, { useState } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabNavigator from "./tabs/TabNavigator";
import Header from "./components/Header";
import * as constants from "./utils/constants";
import HomeScreen from "./screens/HomeScreen";
import ConsultScreen from "./screens/ConsultScreen";
import ProfileScreen from "./screens/ProfileScreen";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App({navigation}) {

  const [item, setItem] = useState("");

  function assignItem(selected) {

    setItem(selected);

  }

  const homeScreenSettings = { 

    tabBarLabel: ({ focused }) => <Text style={{color: focused ? constants.highlightBlue : "#000", fontSize: 10 }}>Home</Text>, 
    tabBarIcon: ({ focused }) => <MaterialCommunityIcons color={focused ? constants.highlightBlue : "#000"} name="home" size={25} />
  };

  const ConsultScreenSettings = { 

    tabBarBadge: 0, 
    tabBarBadgeStyle: { backgroundColor: constants.statusPink }, 
    tabBarLabel: ({ focused }) => <Text style={{color: focused ? constants.highlightBlue : "#000", fontSize: 10 }}>Consults</Text>, 
    tabBarIcon: ({ focused }) => <MaterialCommunityIcons color={focused ? constants.highlightBlue : "#000"} name="message-reply" size={25} /> 
  };

  const ordersScreenSettings = { 

    tabBarBadge: 0, 
    tabBarBadgeStyle: { backgroundColor: constants.statusPink }, 
    tabBarLabel: ({ focused }) => <Text style={{color: focused ? constants.highlightBlue : "#000", fontSize: 10 }}>Orders</Text>,
    headerTitle: () => <Header itemHandler={assignItem} />, 
    tabBarIcon: ({ focused }) => <MaterialCommunityIcons color={focused ? constants.highlightBlue : "#000"} name="cart" size={25} /> 
  };

  const profileScreenSettings = { 

    tabBarLabel: ({ focused }) => <Text style={{color: focused ? constants.highlightBlue : "#000", fontSize: 10 }}>Profile</Text>, 
    tabBarIcon: ({ focused }) => <MaterialCommunityIcons color={focused ? constants.highlightBlue : "#000"} name="account-cog" size={25} /> 
  };

  return (

    <NavigationContainer>

      <Tab.Navigator screenOptions={{ tabBarStyle: { paddingBottom: 2 } }}>

        <Stack.Screen name="Home" component={HomeScreen} options={homeScreenSettings} />
        <Stack.Screen name="Consults" component={ConsultScreen} options={ConsultScreenSettings} />
        <Stack.Screen name="Orders" navigation={navigation} children={()=> <TabNavigator item={item} /> } options={ordersScreenSettings} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={profileScreenSettings} />

      </Tab.Navigator>

    </NavigationContainer>

  );

}
