import React, { useState, useEffect } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer } from "expo-sensors";
import LPF from "lpf/lib/LPF";
import * as Location from "expo-location";

const { height, width } = Dimensions.get("window");

export default App = () => {
  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [location, setLocation] = useState(null);
  const [qiblad, setQiblad] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  LPF.init([]);

  LPF.smoothing = 0.2;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

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
      console.log("qiblad : ",qiblad);
      setQiblad(qiblad);
      setLocation(location);
    })();
    _toggle();

    return () => {
      _unsubscribe();
    };
  }, []);

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
    <Grid style={{ backgroundColor: "#884931" }}>
      {/* <Row style={{ alignItems: "center" }} size={0.9}>
        <Col style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontWeight: "bold",
            }}
          >
            {_direction(_degree(magnetometer))}
          </Text>
        </Col>
      </Row> */}
      {/* <Row style={{ alignItems: "center" }} size={0.1}>
        <Col style={{ alignItems: "center" }}>
          <View
            style={{
              position: "absolute",
              width: width,
              alignItems: "center",
              top: 0,
            }}
          >
            <Image
              source={require("./assets/compass_pointer.png")}
              style={{
                height: height / 26,
                resizeMode: "contain",
              }}
            />
          </View>
        </Col>
      </Row> */}

      <Row style={{ alignItems: "center" }} size={2}>
        <Text
          style={{
            color: "#fff",
            fontSize: height / 27,
            width: width,
            position: "absolute",
            textAlign: "center",
          }}
        >
          {_degree(magnetometer)}°
        </Text>
        <Col style={{ alignItems: "center", flex:1  }}>
          <Image
            source={require("./assets/compass_bg.png")}
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
            source={require("./assets/kaaba.png")}
            style={{
              height: 100,
              width:100,
              top:(width - 80)/3,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
              transform: [{ rotate: 360 - magnetometer + 90 + qiblad  + "deg" }],
              position: 'absolute',
            }}
          />
        </Col>
      </Row>
    </Grid>
  );
};
