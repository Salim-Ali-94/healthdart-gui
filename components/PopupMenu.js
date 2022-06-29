import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Animated } from "react-native";


export default function PopupMenu({ show, children }) {

  const [displayFlag, setDisplayFlag] = useState(show);
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    toggleMenu();

  }, [show]);

  const toggleMenu = () => {

    if (show) {

      setDisplayFlag(true);
      Animated.spring(scale, { toValue: 1, duration: 300, useNativeDriver: true }).start();

    } else {

      setTimeout(() => setDisplayFlag(false), 200);      
      Animated.timing(scale, { toValue: 0, duration: 300, useNativeDriver: true }).start();

    }

  };

  return (

    <Modal transparent visible={displayFlag}>

      <View style={styles.menuContainer}>

        <Animated.View style={ [styles.menu, { transform: [{ scale: scale }]} ] }>

          {children}

        </Animated.View>

      </View>

    </Modal>

  );

};




const styles = StyleSheet.create({

  menuContainer: {

    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  menu: {

    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 5,
    elevation: 20
  }

});

