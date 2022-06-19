import React, { useState, useEffect } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer } from "expo-sensors";
import LPF from "lpf/lib/LPF";
import * as Location from "expo-location";

import colors from "../consts/colors";
import Whither from "../components/Whither";
import { useIsFocused } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

export default Qibla = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [whither, setWhither] = useState(null);
  const [qiblad, setQiblad] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  LPF.init([]);

  LPF.smoothing = 0.2;

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      await fetch(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          location.coords.latitude +
          "&lon=" +
          location.coords.longitude +
          "&appid=59f8e8dfc69b6d93293a3080c649f484&lang=ar&units=metric"
      )
        .then((res) => res.json())
        .then((json) => {
          setWhither(json);
        });
      var PI = Math.PI;
      let latk = (21.4225 * PI) / 180.0;
      let longk = (39.8264 * PI) / 180.0;
      let phi = (location.coords.latitude * PI) / 180.0;
      let lambda = (location.coords.longitude * PI) / 180.0;
      let qiblad =
        (180.0 / PI) *
        Math.atan2(
          Math.sin(longk - lambda),
          Math.cos(phi) * Math.tan(latk) -
            Math.sin(phi) * Math.cos(longk - lambda)
        );
      setQiblad(qiblad);
      //setLocation(location);
    })();
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, [isFocused]);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(LPF.next(angle));
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <Grid style={{ backgroundColor: colors.secondary, marginTop: 35 }}>
      <Row style={{ height: 100 }}>
        <View
          style={{
            height: 60,
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 28,
            }}
          >
            القبلة
          </Text>
        </View>
      </Row>
      <Row
        style={{ alignItems: "center", justifyContent: "space-between" }}
        size={2}
      >
        <Col style={{ alignItems: "center", flex: 1 }}>
          <Image
            source={require("../assets/compass_bg.png")}
            style={{
              height: width - 80,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
              transform: [{ rotate: 360 - magnetometer + "deg" }],
              //position: 'absolute',
            }}
          />
          <Image
            source={require("../assets/kaaba.png")}
            style={{
              height: 100,
              width: 100,
              top: (width - 80) / 3,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
              transform: [{ rotate: 360 - magnetometer + 90 + qiblad + "deg" }],
              position: "absolute",
            }}
          />
        </Col>
      </Row>
      <Row style={{ height: 120, justifyContent: "space-around" }}>
        <View
          style={{
            height: 60,
            width: "80%",
            backgroundColor: colors.primary,
            alignContent: "center",
            alignItems: "center",
            marginHorizontal: 15,
            borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Whither whither={whither} />
        </View>
      </Row>
    </Grid>
  );
};
