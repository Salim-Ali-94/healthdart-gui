import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ArrowSvg from "./ArrowSvg";
import LogoSvg from "./LogoSvg";
import SelectList from "react-native-dropdown-select-list";
import PopupMenu from "./PopupMenu";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as constants from "../utils/constants"; 
// import data from "../assets/data/orders.json";


const getFonts = () => {

  return Font.loadAsync({

    "montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "montserratBold": require("../assets/fonts/Montserrat-Bold.ttf")

  })

};


export default function Header({ itemHandler }) {

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [fontsLoadedFlag, setFontsLoadedFlag] = useState(false);


  const removeDuplicates = array => {

    var temp = [];
    const modified = array.filter(item => { 
    
      const duplicate = temp.includes(item.value);

      if (!duplicate) {

        temp.push(item.value);
        return true;
      }

      return false;

    });

    return modified;

  }


  useEffect(() => {

      populateArray();

  }, []);


  async function populateArray() {

    await fetch(constants.dataUrl, {method: "GET", headers: {"Content-Type": "application/json", "Accept": "application/json"} })
               .then(response => response.json())
               .then(array => setData(array))
               .catch(error => console.error("Error: ", error));
  }


  useEffect(() => {

    let unmounted = false;

    setTimeout(() => {

      if (!unmounted) {

        setVisible(false);
        itemHandler(selected);

      }

    }, 500);

    return () => {

      unmounted = true;
    }

  }, [selected]);

  // I understand that it's bad practice to set the key value of an object equal to it's property value but unfortunately there's a bug in the dropdown menu package where the returned value from the "selected" state is actually equal to the index number of each menu and not the value property
  const prices = [{key: "Ascending order", value: "Ascending order" }, {key: "Descending order", value: "Descending order"}];
  const clinics = data.map(({orderStatus, orderTotal, ...keep}) => {return {key: keep.orderStatus, value: keep.pharmacyName}});
  const statuses = data.map(({pharmacyName, orderTotal, ...keep}) => {return {key: keep.orderStatus, value: keep.orderStatus}});
  const pharmacies = removeDuplicates(clinics);
  const indicators = removeDuplicates(statuses);

  if (fontsLoadedFlag) {

    return (

      <View style={styles.headerContainer}>

        <PopupMenu show={visible}>

          <View style={styles.cardContainer}>

            <View style={styles.closeButtonContainer}>

              <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={1}>

                <MaterialCommunityIcons name="close" size={25} />

              </TouchableOpacity>

            </View>

          </View>

          <View>

            <View style={styles.nameSearchDropdownContainer}>

              <SelectList data={pharmacies} 
                          setSelected={setSelected} 
                          inputStyles={{ fontFamily:"montserrat" }} 
                          search={true} 
                          dropdownStyles={{ borderColor: "#000" }} 
                          dropdownTextStyles={{ fontFamily:"montserrat" }} 
                          placeholder="Search by pharmacy name" />

            </View>

            <View style={styles.statusFilterDropdownContainer}>

              <SelectList data={indicators} 
                          setSelected={setSelected} 
                          inputStyles={{ fontFamily:"montserrat" }} 
                          search={false} 
                          dropdownStyles={{ borderColor: "#000" }} 
                          dropdownTextStyles={{ fontFamily:"montserrat" }} 
                          placeholder="Filter by order status" />

            </View>

            <View>

              <SelectList data={prices} 
                          setSelected={setSelected} 
                          inputStyles={{ fontFamily:"montserrat" }} 
                          search={false} dropdownStyles={{ borderColor: "#000" }} 
                          dropdownTextStyles={{ fontFamily:"montserrat" }} 
                          placeholder="Sort by total cost" />

            </View>

          </View>

        </PopupMenu>

        <View style={styles.backButtonContainer}>

          <ArrowSvg />

        </View>

        <View style={styles.logoContainer}>

          <LogoSvg />

        </View>

        <View style={styles.textContainer}>

          <Text style={styles.headerText}>Orders</Text>

        </View>
    
        <View style={styles.menuContainer}>
    
          <TouchableOpacity style={styles.burgerMenu} onPress={() => setVisible(true)} activeOpacity={1}>

            <MaterialCommunityIcons name="menu" size={30} />

          </TouchableOpacity>
    
        </View>

      </View>

    );

  } else {

      return (<AppLoading onError={console.warn} startAsync={getFonts} onFinish={() => setFontsLoadedFlag(true)} />);
  }

}




const styles = StyleSheet.create({

  headerContainer: { 

    position: "absolute",
    left: -187,
    top: -20,
    flexDirection: "row", 
    alignItems: "center",
    width: 375,
    height: 64,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 0.1,
    paddingTop: 20
  },

  cardContainer: {

    alignItems: "center"
  },

  closeButtonContainer: {

    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center"
  },

  nameSearchDropdownContainer: {

    marginBottom: 10, 
    marginTop: 5
  },

  statusFilterDropdownContainer: {

    marginBottom: 10
  },

  backButtonContainer: { 

    borderRightColor: "lightgrey",
    borderRightWidth: 0.5,
    flex: 1,
    justifyContent: "center",
    height: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
    marginLeft: -12
  },

  logoContainer: { 

    flex: 1,
    paddingLeft: 5
  },

  textContainer: { 

    flex: 1
  },

  headerText: { 

    fontWeight: "bold",
    fontSize: 25,
    color: "#000",
    width: 75,
    fontFamily: "montserratBold",
    marginLeft: -15
  },

  menuContainer: { 

    flex: 4,
    justifyContent: "center"
  },

  burgerMenu: { 

    position: "absolute",
    right: 0,
    paddingRight: 10
  }

});
