import * as Location from "expo-location"

const getLocation = async (location: string) => {
   try {
    if (location === undefined || location === "") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        console.log("LOcation not permitted");
        return;
      }

      let coords = await Location.getCurrentPositionAsync({});
      return {latitude:coords.coords.latitude,longitude:coords.coords.longitude}
    }
    let coords = await Location.geocodeAsync(location);
    return {latitude:coords[0].latitude,longitude:coords[0].longitude}
      } catch (error) {
    throw error
  }
  
}

const getStringLocation = async (lat:any,lon:any)=>{
  try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        console.log("LOcation not permitted");
        return;
      }
      const location = await Location.reverseGeocodeAsync({latitude:lat,longitude:lon});
      return location;
  } catch (error) {
    throw error 
  }
}

export {getLocation,getStringLocation};
