import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import * as Network from "expo-network";
import { useEffect, useState } from 'react';
import { View,Text } from 'react-native';
export default function TabsLayout() {
  let [networkState,setNetworkState] = useState<boolean|undefined>(true);
  useEffect(()=>{
    const check = async ()=>{
      const netstate = await Network.getNetworkStateAsync();
      setNetworkState(netstate.isConnected);
    } 
    check();
  },[])

  if(!networkState){

    return <View>
        <Text style={{textAlign:"center",fontSize:30,fontWeight:"bold"}}>You are offline connect to network</Text>

    </View>  
  }

  return (
      <Tabs screenOptions={{tabBarShowLabel:true,headerShown:false,tabBarStyle:{height:70,backgroundColor:"#B27092",borderTopWidth:0,elevation:0},tabBarActiveTintColor:"#FFE9F3",tabBarInactiveTintColor:"black"}}>
          <Tabs.Screen name='index'  options={{tabBarLabel:"Search",title:"Search",tabBarIcon:({color})=><Ionicons name='earth-sharp'  color={color} size={24} /> }} />
          <Tabs.Screen name='map' options={{tabBarLabel:"Map",title:"Map",tabBarIcon:({color})=><Ionicons name='map-sharp'  color={color} size={24} /> }}/>
          <Tabs.Screen name='about' options={{tabBarLabel:"About",title:"About",tabBarIcon:({color})=><Ionicons name='infinite-sharp'  color={color} size={24} /> }} />
      </Tabs>
  )
}
