import { useLocalSearchParams } from 'expo-router'
import fetchWeatherData from '@/services/fetch'
import {getLocation,getStringLocation} from '@/services/location'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import getWeatherIconAndDescription from '@/services/weatherCode'


export default function Detail() {
  const {latitude:latitudeFromParam,longitude:longitudeFromParam}= useLocalSearchParams();
  let [load,setLoad] = useState<boolean>(false);
  let [dailyTime,setDailyTime] = useState<any>();
  let [dailyTemp,setDailyTemp] = useState<any>();
  let [dailyCode,setDailyCode] = useState<any>();
  let [hourlyTime,setHourlyTime] = useState<any>();
  let [hourlytemp,setHourlyTemp] = useState<any>();
  let [hourlyCode,setHourlyCode] = useState<any>();
  let [place,setPlace] = useState("");
  let [error,setError] = useState<any|null>();
  useEffect(()=>{
    const fetchdata = async ()=>{
      setLoad(true)
      try {
      
      const { dailyWeather,hourlyWeather,latitude,longitude } = await fetchWeatherData(Number(latitudeFromParam),Number(longitudeFromParam))    
      setDailyTime(dailyWeather.time);
      setDailyTemp(dailyWeather.temperature_2m_max);
      setDailyCode(dailyWeather.weather_code);
      setHourlyTime(hourlyWeather.time);
      setHourlyTemp(hourlyWeather.temperature_2m);
      setHourlyCode(hourlyWeather.weather_code);
      const coordPlace=await getStringLocation(latitude,longitude); 
      setPlace(`${coordPlace && coordPlace[0].city},${coordPlace && coordPlace[0].country}`)
      
    
      } catch (error:any) {
        setError(error.message||"An unknown error occurred");
        
      }
      setLoad(false);
            
    }
    fetchdata();
  },[])
  
  if(load){
    return (
      <View style={styles.container}>
          <ActivityIndicator size={50} />
          <Text>Fetching Weather ....</Text>
      </View>
    )

  }
  if(error){
    return <View style={styles.container}>
        <Text>{error}</Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <Text style={{color:"#B27092",padding:15,fontSize:24}}>{place}</Text>
      <ScrollView horizontal={true} style={{ marginTop: 20 }} >
      {hourlyTime && hourlyTime.map((e:Date,i:number) => {
          return (<View key={e.getTime()} style={styles.card} >
            <View style={{ marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <Text>{e.toLocaleTimeString()}</Text>
            </View>

            <Text style={{ textAlign: "center", marginTop: 15 }}> <Ionicons name={getWeatherIconAndDescription(hourlyCode[i]).icon} size={100} /></Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={styles.temperature}>{hourlytemp[i].toFixed()}°F </Text>
              <Text style={{ fontSize: 16 }}>{getWeatherIconAndDescription(hourlyCode[i]).description}</Text>
            </View>
          </View>)
        })}



      </ScrollView>
      <ScrollView horizontal={true} >
        {dailyTime && dailyTime.map((e:Date,i:number) => {
          return (<View key={e.getTime()} style={styles.card} >
            <View style={{ marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <Text>{e.toLocaleDateString().split("/").join("-")}</Text>
            </View>

            <Text style={{ textAlign: "center", marginTop: 15 }}> <Ionicons name={getWeatherIconAndDescription(dailyCode[i]).icon} size={100} /></Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={styles.temperature}>{dailyTemp[i].toFixed()}°F </Text>
              <Text style={{ fontSize: 16 }}>{getWeatherIconAndDescription(dailyCode[i]).description} </Text>
            </View>
          </View>)
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#512D38" 
  },
  image: {
    margin: 30,
    flex: 1,
    marginTop: 20,
    backgroundColor: "lightblue",
    borderRadius: 5
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold"
  },
  card:{ width: 250, height: 250, boxShadow: "2px 2px 8px black", borderRadius: 15, margin: 5,backgroundColor:"#B27092" }


})

