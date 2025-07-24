import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Detail() {
  const {latitude,longitude}= useLocalSearchParams();
  return (
    <View>
      <Text>{latitude}-{longitude}</Text>
    </View>
  )
}
