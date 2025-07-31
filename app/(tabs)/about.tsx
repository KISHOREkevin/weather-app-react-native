import { View, Text, StyleSheet } from 'react-native'

export default function about() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >About This App</Text>
      <Text style={styles.content}>This app provides real-time weather forecasts powered by the Open-Meteo API, allowing you to stay informed about weather conditions anywhere in the world. We've integrated interactive maps using Expo Maps, so you can visualize weather patterns and explore forecasts geographically.</Text>
    <Text style={styles.title}>Data Source</Text> 
    <Text style={styles.content}>Weather data is sourced from Open-Meteo. Open-Meteo provides free weather API services for non-commercial and commercial use, relying on open-source weather models and public domain data. Learn more about Open-Meteo: https://open-meteo.com/</Text>
        <Text style={styles.content}>Thanks for using my application ,We're constantly working to improve your experience! </Text>
        <Text style={{fontSize:12,fontWeight:"bold",textAlign:"center",color:"white"}}> Copyright (c) 2025 Kishore Kevin. All Rights Reserved. </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#512D38",
  },
  title:{
    fontSize:24,
    fontWeight:"bold",
    color:"white"
  },
  content:{
    fontSize:16,
    margin:10,
    textAlign:"justify",
    color:"white"
  }
})
