import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location";
import { router } from 'expo-router';


export default function map() {
  let [initialRegion,setInitialRegion] = useState({latitude:0,longitude:0,latitudeDelta: 0.0922,longitudeDelta: 0.0421});
    let [load,setLoad]=useState(false);
    let [error,setError] = useState<any|null>();
    useEffect(()=>{
    
      const getCurrentLocation = async ()=>{
      setLoad(true);
      const {status} = await Location.requestForegroundPermissionsAsync();
      if(status != 'granted'){
          setError("LOcation not permitted");
          setLoad(false);
          return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setInitialRegion({latitude:location.coords.latitude,longitude:location.coords.longitude,latitudeDelta: 0.0922,longitudeDelta: 0.0421});
      setLoad(false);
      
      
    }

    getCurrentLocation()
  },[]);



  const getLocation = (e:any)=>{
    const {coordinate} = e.nativeEvent;
    setInitialRegion({
      ...initialRegion,
      latitude:coordinate.latitude,
      longitude:coordinate.longitude
    })
    
    router.navigate({pathname:"/(tabs)/map/detail",params:{latitude:coordinate.latitude,longitude:coordinate.longitude}});
    
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

      <MapView style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} showsMyLocationButton={true} region={initialRegion} showsCompass={true} onPress={getLocation} >
        <Marker coordinate={{ latitude:initialRegion.latitude ,longitude:initialRegion.longitude}} draggable={true} />
      </MapView>
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
  map: {
    width: "100%",
    height: "100%"
  }
})
