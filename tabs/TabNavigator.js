import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilteredOrdersScreen from "../screens/FilteredOrdersScreen";
import NestedTabs from "./NestedTabs";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";


const getFonts = () => {

  return Font.loadAsync({

    "montserrat": require("../assets/fonts/Montserrat-Regular.ttf")

  })

}


const Stack = createNativeStackNavigator();

export default function TabNavigator({item}) {

  const [fontsLoadedFlag, setFontsLoadedFlag] = useState(false);

  const filteredOrderSettings = {

    headerShown: true, 
    headerTitleStyle: { fontFamily: "montserrat" }, 
    headerBackTitleVisible: false 
  };

  if (fontsLoadedFlag) {

    return (

      <Stack.Navigator>

        <Stack.Screen name="Cards" children={()=> <NestedTabs item={item} /> } options={{headerShown: false}} />
        <Stack.Screen name="Filtered orders" component={FilteredOrdersScreen} options={filteredOrderSettings} />

      </Stack.Navigator>

    );

  } else {

      return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoadedFlag(true)} />);

  }

}

