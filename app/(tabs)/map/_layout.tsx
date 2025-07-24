 import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
  
  export default function MapLayout() {
    return (
      <Stack>
        <Stack.Screen name='mapview' options={{headerShown:false}} />
        <Stack.Screen name='detail' options={{headerShown:false}} />
      </Stack>
    )
  } 
