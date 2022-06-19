import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerItem } from '@react-navigation/drawer'
import colors from '../consts/colors'

const MenuItem = (props) => {
  return (
    <DrawerItem 
            icon={({ color, size }) => (
              <Image
                source={props.icon }
                style={{ height: size, width: size  , tintColor:colors.primary}}
                resizeMode="contain"
              />
            )}
            style={{
              alignItems: "stretch",
              borderColor: colors.primary,
              borderWidth: 1,
              marginHorizontal:15
            }}
            label={props.name}
            labelStyle={styles.lblItem}
            onPress={props.onPress}
          />
  )
}

export default MenuItem

const styles = StyleSheet.create({
    lblItem: {
        fontSize: 14,
        color: colors.primary,
      },
})