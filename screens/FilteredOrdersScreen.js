import React from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Card from "../components/Card";


export default function FilteredOrdersScreen({navigation, route}) {

  let data = route.params.array;
  let category = route.params.category;

  return (

    <View style={styles.screenContainer}>

      {
        (category === "Ascending order") ?

          (<ScrollView style={styles.scrollContainer}>

            <View style={styles.ordersContainer}>

              { data.sort((a, b) => a.orderTotal - b.orderTotal).map(item => <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }

            </View>

          </ScrollView>) :

        (category === "Decending order") ?

         (<ScrollView style={styles.scrollContainer}>

            <View style={styles.ordersContainer}>

              { data.sort((a, b) => b.orderTotal - a.orderTotal).map(item => <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }

            </View>

          </ScrollView>) :

       (data.some(item => item.pharmacyName === category)) ?

           (<ScrollView style={styles.scrollContainer}>

              <View style={styles.ordersContainer}>

                { data.filter(item => (item.pharmacyName === category)).map(item => <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }

              </View></ScrollView>) :

        (data.some(item => item.orderStatus === category)) ?

            (<ScrollView style={styles.scrollContainer}>

                <View style={styles.ordersContainer}>

                  { data.filter(item => (item.orderStatus === category)).map(item => <Card key={item.orderID} status={item.orderStatus} pharmacy={item.pharmacyName} cost={item.orderTotal} />) }

                </View>

            </ScrollView>) : (<Text>NO SEARCH FILTERS CURRENTLY APPLIED</Text>)

        }

    </View>

  );

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

  ordersContainer: { 

    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: 15
  }

});
