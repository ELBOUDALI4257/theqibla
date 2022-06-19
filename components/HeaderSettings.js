import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Title } from "react-native-paper";
import colors from "../consts/colors";

const HeaderSettings = () => {
  return (
    <View style={styles.userInfoSection}>
      <View style={{ flexDirection: "row", marginTop: 15 , justifyContent: "space-around" , width:"50%" , marginRight:20  }}>
        <View style={{ marginLeft: 15, flexDirection: "column" , justifyContent:"center" , padding:20 }}>
          <Title style={styles.title}>{"القبلة"}</Title>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../assets/icon.png")}
            size={50}
            style={{
              width: 70,
              height: 70,
              backgroundColor: colors.primary,
              borderRadius: 35,
              borderWidth: 3,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderSettings;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent:"space-between",
    minWidth:300
  },
  title: {
    fontSize: 25,
    marginTop: 3,
    fontWeight: "bold",
    color: colors.primary,
    alignContent:"center",
    textAlign:"center",
  },
});
