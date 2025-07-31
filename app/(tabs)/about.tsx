import { View, Text, StyleSheet } from 'react-native'

export default function about() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >About This App</Text>
      <Text style={styles.content}>This app provides real-time weather forecasts powered by the Open-Meteo API, allowing you to stay informed about weather conditions anywhere in the world. We've integrated interactive maps using Expo Maps, so you can visualize weather patterns and explore forecasts geographically.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    margin:10
  },
  title:{
    fontSize:24,
    fontWeight:"bold"
  },
  content:{
    fontSize:16,
  }
})
