import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Grid, Row } from "react-native-easy-grid";
import colors from "../consts/colors";
import { ScrollView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { useIsFocused } from "@react-navigation/native";

const ProfConver = () => {
  const [data, setData] = useState(null);
  const [haditType, setHaditType] = useState("muslim");
  const [loading, setLoading] = useState(true);
  const date = new Date();
  const [next, setnext] = useState(0);
  const [loaded] = useFonts({
    "Inter-Black": require("../assets/fonts/ExpoArabicBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const fetchData = async () => {
    await fetch(
      "https://api.hadith.sutanlab.id/books/" +
        haditType +
        "/" +
        ((date.getDate() + date.getMonth() * 30 + next) % 300)
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(next);
        setData(json.data.contents.arab);
      });
  };
  fetchData();

  return (
    <Grid style={{ backgroundColor: colors.secondary, marginTop: 35 }}>
      <Row style={{ height: 100, marginBottom: 40 }}>
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
            الأحاديث
          </Text>
        </View>
      </Row>

      <Row>
        <View
          style={{
            height: 60,
            width: "100%",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 10,
            //justifyContent: "center",
            minHeight: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "80%",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity onPress={() => setHaditType("muslim")}>
              <Text
                style={{
                  color: colors.primary,
                  backgroundColor:
                    haditType == "muslim"
                      ? colors.primaryOpacity
                      : colors.secondary,
                  borderColor: colors.primaryOpacity,
                  borderWidth: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  height: 30,
                  padding: 5,
                  borderRadius: 7,
                  width: 120,
                }}
              >
                مسلم
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setHaditType("bukhari")}>
              <Text
                style={{
                  color: colors.primary,
                  backgroundColor:
                    haditType == "bukhari"
                      ? colors.primaryOpacity
                      : colors.secondary,
                  borderColor: colors.primaryOpacity,
                  borderWidth: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                  height: 30,
                  padding: 5,
                  borderRadius: 7,
                  width: 120,
                  alignSelf:"center",
                  alignContent:"center",
                }}
              >
                البخاري
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",
              marginTop: 10,
              //minHeight: "100%",
              borderRadius: 25,
              backgroundColor: "#DDD",
              height: Dimensions.get("window").width - 50,
            }}
          >
            <View style={{ height: 50, marginTop: 15 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomColor: "#CCC",
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}
              >
                {next == 0 ? "حديث اليوم" : "احاديث"}
              </Text>
            </View>
            {data == null && (
              <ActivityIndicator
                size={50}
                color={colors.primary}
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              />
            )}
            {data != null && (
              <View style={{ marginTop: 5, padding: 10 }}>
                <ScrollView
                  style={{ height: Dimensions.get("window").width - 150 }}
                >
                  <Text
                    style={{
                      textAlign: "auto",
                      fontSize: 16,
                      fontWeight: "bold",
                      borderBottomColor: "#CCC",
                      paddingHorizontal: 5,
                    }}
                  >
                    {data}
                  </Text>
                </ScrollView>
              </View>
            )}
          </View>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 90,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ margin:7 }}
              onPress={() => {
                setnext(next + 1);
              }}
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: colors.primaryOpacity,
                  tintColor: colors.primary,
                  borderRadius: 16,
                }}
                source={require("../assets/icons/next.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin:7 }}
              onPress={() => {
                setnext(next - 1);
              }}
            >
              <Image
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: colors.primaryOpacity,
                  tintColor: colors.primary,
                  borderRadius: 16,
                }}
                source={require("../assets/icons/previous.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Row>
    </Grid>
  );
};

export default ProfConver;

const styles = StyleSheet.create({});
