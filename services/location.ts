import * as Location from "expo-location"

const getLocation = async (location: string) => {

    if (location === undefined || location === "") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        throw new Error("Location not permitted")
      }
           let coords = await Location.getCurrentPositionAsync({});
      return {latitude:coords.coords.latitude,longitude:coords.coords.longitude}
    }
    let coords = await Location.geocodeAsync(location);
    return {latitude:coords[0].latitude,longitude:coords[0].longitude}
       
}

const getStringLocation = async (lat:any,lon:any)=>{
        const { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        throw "LOcation not permitted"
      }
      
      const location = await Location.reverseGeocodeAsync({latitude:lat,longitude:lon});
      return location;
 }

export {getLocation,getStringLocation};
