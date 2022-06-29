import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as constants from "../utils/constants";


export default function Card({status, pharmacy, cost}) {

  return (

    <View style={styles.cardContainer}>

      <View style={styles.detailsContainer}>

        <View style={styles.statusContainer}>

          { <View style={[styles.statusIndicator, { backgroundColor: status === "Submitted" ? constants.highlightBlue : constants.statusPink }]}></View> }
          <View><Text style={styles.statusText}>{status}</Text></View>

        </View>

        <View style={styles.pharmacyContainer}>

          <Text style={styles.pharmacyText}>{pharmacy}</Text>

        </View>

        <View style={styles.amountContainer}>

          <Text style={styles.amountText}>Sum total: R {cost}</Text>

        </View>

      </View>

      <View style={styles.arrowContainer}>

        <View><MaterialCommunityIcons name="chevron-right" size={25}/></View>

      </View>

    </View>

  );

}




const styles = StyleSheet.create({

  cardContainer: { 

    flexDirection: "row", 
    borderRadius: 5,
    width: "90%",
    minHeight: 80,
    backgroundColor: constants.selectedGrey,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 5 
  },
 
  detailsContainer: { 

    flex: 5
  },

  statusContainer: { 

    flex: 1, 
    flexDirection: "row", 
    alignItems: "center",
    paddingBottom: 5
  },

  statusIndicator: { 

    height: 10, 
    width: 10, 
    borderRadius: 50,
    marginRight: 5
  },

  statusText: { 

  },

  pharmacyContainer: { 

    flex: 1,
    flexWrap: "wrap",
  },

  pharmacyText: { 

    fontWeight: "bold",
    fontSize: 16
  },

  amountContainer: { 

    flex: 1
  },

  amountText: { 

    fontSize: 16
  },

  arrowContainer: { 

    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  }

});
