import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Moment from "moment";

import colors from "../consts/colors.js";

const Whither = (props) => {
  Moment.locale("en");

  if (props.whither == null) {
    return (
      <ActivityIndicator
        size={25}
        color={colors.secondary}
        style={{
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      />
    );
  } else {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text
            style={{
              color: "#EEE",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            {props.whither && Math.round(props.whither.main.temp)} ºC
          </Text>
          <Text
            style={{
              color: colors.secondary,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 12,
              alignSelf: "center",
              marginTop:4
            }}
          >
            درجة الحرارة
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            source={{ uri: "http://openweathermap.org/img/wn/10d@4x.png" }}
            style={{ width: 32, height: 32 }}
          />
          <Text
            style={{
              color: colors.secondary,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 12,
              alignSelf: "center",
            }}
          >
            {props.whither && props.whither.weather[0].description}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "#EEE",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {props.whither && props.whither.name}
          </Text>
          <Text
            style={{
              color: colors.secondary,
              textAlign: "center",
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 4,
            }}
          >
            {Moment(new Date()).format("DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    );
  }
};

export default Whither;

const styles = StyleSheet.create({});
