import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
export default function TabsLayout() {
  return (
      <Tabs screenOptions={{tabBarShowLabel:true,headerShown:false,tabBarStyle:{height:70}}}>
          <Tabs.Screen name='home'  options={{tabBarLabel:"Search",title:"Search",tabBarIcon:({color})=><Ionicons name='earth-sharp'  color={color} size={24} /> }} />
          <Tabs.Screen name='map' options={{tabBarLabel:"Map",title:"Map",tabBarIcon:({color})=><Ionicons name='map-sharp'  color={color} size={24} /> }}/>
          <Tabs.Screen name='about' options={{tabBarLabel:"About",title:"About",tabBarIcon:({color})=><Ionicons name='infinite-sharp'  color={color} size={24} /> }} />
      </Tabs>
  )
}
