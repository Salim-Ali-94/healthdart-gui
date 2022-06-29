import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Card from "../components/Card";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import * as constants from "../utils/constants"; 
// import data from "../assets/data/orders.json";


const getFonts = () => {

  return Font.loadAsync({

    "montserratSemibold": require("../assets/fonts/Montserrat-SemiBold.ttf")
  })

}


export default function SubmittedOrders({ selected }) {

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [fontsLoadedFlag, setFontsLoadedFlag] = useState(false);

  useEffect(() => {

      populateArray();

    }, []);

    async function populateArray() {

      await fetch(constants.dataUrl, {method: "GET", headers: {"Content-Type": "application/json","Accept": "application/json"} })
                 .then(response => response.json())
                 .then(array => setData(array))
                 .catch(error => console.error("Error: ", error));

    }

  useEffect(() => {

    if (selected !== "") {

      let unmounted = false;

       setTimeout(() => {

        if (!unmounted) {

          navigation.navigate("Filtered orders", { array: data, category: selected });

        }

      }, 500);

      return () => {

        unmounted = true;

      }
    }

  }, [selected]);

  if (fontsLoadedFlag) {

      return (

        <View style={styles.screenContainer}>

           <ScrollView style={styles.scrollContainer}>

              <Text style={styles.submittedOrders}>Submitted Orders</Text>
              <Text style={[styles.orderCategory, {marginTop: 30}]}>Pending Orders</Text>
                
              <View style={styles.ordersContainer}>
      
                  { data.map(item => (item.orderStatus !== "Delivered") && <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }
      
              </View>
                
              <Text style={[styles.orderCategory, {marginTop: 10}]}>Delivered</Text>
                
              <View style={styles.ordersContainer}>
                
                  { data.map(item => (item.orderStatus === "Delivered") && <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }
                
              </View>

          </ScrollView>

        </View>

      );

    } else {

        return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoadedFlag(true)} />);

    }

}




const styles = StyleSheet.create({

  screenContainer: { 

    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#fff"
  },

  scrollContainer: {

    width: "100%"
  },

  submittedOrders: { 

    marginLeft: "5%",
    marginTop: 20,
    fontSize: 30,
    fontFamily: "montserratSemibold"
  },

  orderCategory: { 

    marginLeft: "5%",
    fontFamily: "montserratSemibold"
  },

  ordersContainer: { 

    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: 15
  }

});
