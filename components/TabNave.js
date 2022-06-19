import { StyleSheet, Image, View , Text } from 'react-native'
import React from 'react'
import colors from '../consts/colors';

const TabNave = (props) => {
    const icon =props.icon;
    return (
        <View style={{flexDirection:"column" , width:"100%" , alignItems:"center"}}>
            <Image
                resizeMode={'contain'}
                source={
                    icon=="settings"?require("../assets/icons/settings.png"):
                    icon=="qibla"?require("../assets/icons/qibla.png"):
                    require("../assets/icons/conversations.png")
                }
                style={{ width: 24, height: 24 , tintColor :props.isfocused ? colors.primary : "#BBB"}}
            />
            <Text style={{
                color:props.isfocused ? colors.primary : "#BBB" ,
                textAlign:"center",
                width:"100%",
                fontWeight:"bold"
                }}>{props.name}</Text>
        </View>
    )
}

export default TabNave

const styles = StyleSheet.create({})