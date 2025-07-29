import fetchWeatherData from '@/services/fetch'
import {getLocation,getStringLocation} from '@/services/location'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'

import getWeatherIconAndDescription from '@/services/weatherCode'
export default function Home() {
  let [load,setLoad] = useState<boolean>(false);
  let [dailyTime,setDailyTime] = useState<any>();
  let [dailyTemp,setDailyTemp] = useState<any>();
  let [dailyCode,setDailyCode] = useState<any>();
  let [hourlyTime,setHourlyTime] = useState<any>();
  let [hourlytemp,setHourlyTemp] = useState<any>();
  let [hourlyCode,setHourlyCode] = useState<any>();
  let [place,setPlace] = useState("");
  let [inputPlace,setInputPlace] = useState("");
  useEffect(()=>{
    const fetchdata = async ()=>{
      setLoad(true)
      try {
       const location = await getLocation(inputPlace);
      const { dailyWeather,hourlyWeather,latitude,longitude } = await fetchWeatherData(location?.latitude,location?.longitude)       
      setDailyTime(dailyWeather.time);
      setDailyTemp(dailyWeather.temperature_2m_max);
      setDailyCode(dailyWeather.weather_code);
      setHourlyTime(hourlyWeather.time);
      setHourlyTemp(hourlyWeather.temperature_2m);
      setHourlyCode(hourlyWeather.weather_code);
      const coordPlace=await getStringLocation(latitude,longitude); 
      setPlace(`${coordPlace && coordPlace[0].city},${coordPlace && coordPlace[0].country}`)
      
    
      } catch (error) {
        console.log(error);
        
      }
      setLoad(false);
            
    }
    fetchdata();
  },[])
    
  
  const searchWeather = async (place:string)=>{
    setLoad(true)
      try {
       const location = await getLocation(place);
      const { dailyWeather,hourlyWeather,latitude,longitude } = await fetchWeatherData(location?.latitude,location?.longitude)       
      setDailyTime(dailyWeather.time);
      setDailyTemp(dailyWeather.temperature_2m_max);
      setDailyCode(dailyWeather.weather_code);
      setHourlyTime(hourlyWeather.time);
      setHourlyTemp(hourlyWeather.temperature_2m);
      setHourlyCode(hourlyWeather.weather_code);
      const coordPlace=await getStringLocation(latitude,longitude); 
      setPlace(`${coordPlace && coordPlace[0].city},${coordPlace && coordPlace[0].country}`)
      
    
      } catch (error) {
        console.log(error);
        
      }
      setLoad(false);

  }

  if(load){
    return (
      <View style={styles.container}>
          <ActivityIndicator size={50} />
          <Text>Fetching Your location ....</Text>
      </View>
    )

  }
  
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput style={styles.input} onChangeText={(value)=>setInputPlace(value)} />
        <TouchableOpacity style={styles.button} onPress={()=>searchWeather(inputPlace)} >
          <Text style={{ color: "white", textAlign: "center" }}> <Ionicons name='search-sharp' size={24} /> </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>searchWeather("")} >
          <Text style={{ color: "white", textAlign: "center" }}> <Ionicons name="location" size={24} /> </Text>
        </TouchableOpacity>

      </View>
      <Text>{place}</Text>
      <ScrollView horizontal={true} style={{ marginTop: 20 }} >
      {hourlyTime && hourlyTime.map((e:Date,i:number) => {
          return (<View key={e.getTime()} style={{ width: 250, height: 250, boxShadow: "2px 2px 8px black", borderRadius: 5, margin: 5 }} >
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
          return (<View key={e.getTime()} style={{ width: 250, height: 250, boxShadow: "2px 2px 8px black", borderRadius: 5, margin: 5 }} >
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
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: "60%",
    margin: 5,
    borderRadius: 5,
    borderColor: "blue",

  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center"
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
  }

})

