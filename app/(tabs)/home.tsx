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
  let [error,setError] = useState<any|null>();
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
        setError(error);
        
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
        setError(error);
        
      }
      setLoad(false);

  }

  if(load){
    return (
      <View style={styles.container}>
          <ActivityIndicator size={50} color={"#B27092"} />
          <Text style={{color:"#B27092"}}>Fetching Your location ....</Text>
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
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput style={styles.input} onChangeText={(value)=>setInputPlace(value)} />
        <TouchableOpacity style={styles.button} onPress={()=>searchWeather(inputPlace)} >
          <Text style={{ color: "white", textAlign: "center" }}> <Ionicons color={"black"} name='search-sharp' size={20} /> </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>searchWeather("")} >
          <Text style={{ color: "white", textAlign: "center" }}> <Ionicons color={"black"} name="location" size={20} /> </Text>
        </TouchableOpacity>

      </View>
      <Text style={{color:"#B27092",padding:15,fontSize:24}}>{place}</Text>
      <ScrollView horizontal={true} style={{ marginTop: 10 }} >
      {hourlyTime && hourlyTime.map((e:Date,i:number) => {
          return (<View key={e.getTime()} style={styles.card} >
            <View style={{ marginTop: 10, marginBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <Text >{e.toLocaleTimeString()}</Text>
            </View>

            <Text style={{ textAlign: "center", marginTop: 15  }}> <Ionicons name={getWeatherIconAndDescription(hourlyCode[i]).icon} size={100} /></Text>
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
  input: {
    borderWidth: 1,
    padding: 10,
    width: "60%",
    margin: 5,
    borderRadius: 5,
    borderColor: "#B27092",
    color:"white"  
  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#B27092",
    alignItems: "center",
    justifyContent: "center",
    margin:2
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
    fontWeight: "bold",
     },
     card:{ width: 250, height: 250, boxShadow: "2px 2px 8px black", borderRadius: 15, margin: 5,backgroundColor:"#B27092" }
})

