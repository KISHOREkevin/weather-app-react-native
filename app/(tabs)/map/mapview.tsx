import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from "expo-location";
import { router } from 'expo-router';
import { getLocation } from '@/services/location';


export default function map() {
  let [initialRegion, setInitialRegion] = useState({ latitude: 0, longitude: 0, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
  let [load, setLoad] = useState(false);
  let [error, setError] = useState<any | null>();
  useEffect(() => {

    const getCurrentLocation = async () => {

      setLoad(true);
      try {
       const location = await getLocation("");
      setInitialRegion({ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
 
      } catch (error:any) {
       setError(error.message||"An unknown error occurred"); 
      }
            setLoad(false);


    }

    getCurrentLocation()
  }, []);



  const getMarkerLocation = (e: any) => {
    const { coordinate } = e.nativeEvent;
    setInitialRegion({
      ...initialRegion,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    })

    router.navigate({ pathname: "/(tabs)/map/detail", params: { latitude: coordinate.latitude, longitude: coordinate.longitude } });

  }

  if (load) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} color={"#B27092"} />
        <Text style={{ color: "#B27092" }}>Fetching Your location ....</Text>
      </View>
    )

  }

  if (error) {
    return <View style={styles.container}>
      <Text  style={{color:"white",textAlign:"center"}}>{error}</Text>
    </View>
  }

  return (
    <View style={styles.container}>

      <MapView style={styles.map} provider={PROVIDER_GOOGLE} showsUserLocation={true} showsMyLocationButton={true} region={initialRegion} showsCompass={true} onPress={getMarkerLocation} >
        <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} draggable={true} />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#512D38"

  },
  map: {
    width: "100%",
    height: "100%"
  }
})
