import { View, Image, StyleSheet, Linking } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import {
  Title,
  Caption,
  Drawer,
  TouchableRipple,
  Text,
  Switch,
} from "react-native-paper";

const profileIcon = require("../assets/icons/kaaba.png");
const aboutIcon = require("../assets/icons/about.png");
const callIcon = require("../assets/icons/call.png");

import colors from "../consts/colors.js";
import MenuItem from "../components/MenuItem.js";
import HeaderSettings from "../components/HeaderSettings.js";

const Settings = () => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <HeaderSettings />
          <Drawer.Section style={styles.drawerSection}>
            <MenuItem name="الملف الشخصي" icon={profileIcon} />
            <MenuItem name="تعرف علينا" icon={aboutIcon}  onPress={() => {
                    Linking.openURL("https://www.linkedin.com/in/ibrahim-safsafi-33b156231");
                  }}/>
            <MenuItem name="تواصل معنا" icon={callIcon} onPress={() => {
                    Linking.openURL("https://www.linkedin.com/in/nabilelboudali");
                  }}/>
          </Drawer.Section>
          </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",
    backgroundColor:colors.secondary,
   },
  drawerContent: {
    flex: 1,
    marginTop:20
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: "#367ABD",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 50,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#FFDD0E",
    borderTopWidth: 2,
  },
  preference: {
    flexDirection: "row-reverse",
    paddingVertical: 5,
    paddingHorizontal: 16,
    backgroundColor:colors.primary,
    justifyContent:"flex-start",
     borderRadius:15
  },
  lblItem: {
    fontSize: 16,
    color:colors.secondary,
    fontWeight:"bold",
    
  },
});
