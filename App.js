import React from 'react'
import { Text, View,Image , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Qibla from './screens/Qibla.js'
import Settings  from './screens/Settings.js';
import colors from "./consts/colors.js"
import TabNave from './components/TabNave.js';
import ProfConver from './screens/ProfConver.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator  
      defaultScreenOptions={false}
      screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:{height:70 , backgroundColor:colors.secondary , borderColor:colors.secondary},
        
      }}
      
      >
        <Tab.Screen name="Qiblah" component={Qibla} options={{
          tabBarIcon:({focused})=>(
            <TabNave name="القبلة" icon="qibla" isfocused={focused}/>
          )
        }}/>
        <Tab.Screen name="ProfConver" component={ProfConver} options={{
          tabBarIcon:({focused})=>(
               <TabNave name="الأحاديث" icon="conversations" isfocused={focused}/>
          )
        }}/>
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarIcon:({focused})=>(
               <TabNave name="الإعدادات" icon="settings" isfocused={focused}/>
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({})