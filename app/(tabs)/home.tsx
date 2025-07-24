import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Image } from "expo-image"
export default function Home() {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.button} >
          <Text style={{ color: "white", textAlign: "center" }}> <Ionicons name='search-sharp' size={24} /> </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: "50%", marginTop: 20 }}>
        <ScrollView horizontal={true} >
        {/* --------------------------------------- */} 
          <View style={{ width: 250, height: 300, boxShadow:"2px 2px 8px black" , borderRadius: 5, margin: 5 }} >
          <View style={{marginTop:10,display:"flex" ,flexDirection:"row",justifyContent:"space-around"}}>
              <Text>2025-07-24</Text>
              <Text>15:00</Text>
            </View>

            <Image source={"https://openweathermap.org/img/wn/10d@2x.png"} style={styles.image} />
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              <Text style={styles.temperature}>90°F</Text>
              <Text style={{ fontSize: 16 }}>light rain</Text>
            </View>
          </View>
          {/* --------------------------------------- */}
          <View style={{ width: 250, height: 300, boxShadow:"2px 2px 8px black", borderRadius: 5, margin: 5 }} >
          <View style={{marginTop:10,display:"flex" ,flexDirection:"row",justifyContent:"space-around"}}>
              <Text>2025-07-24</Text>
              <Text>15:00</Text>
            </View>

            <Image source={"https://openweathermap.org/img/wn/10d@2x.png"} style={styles.image} />
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              <Text style={styles.temperature}>90°F</Text>
              <Text style={{ fontSize: 16 }}>light rain</Text>
            </View>
          </View>
          {/* --------------------------------------- */}
          <View style={{ width: 250, height: 300, boxShadow:"2px 2px 8px black", borderRadius: 5, margin: 5 }} >
          <View style={{marginTop:10,display:"flex" ,flexDirection:"row",justifyContent:"space-around"}}>
              <Text>2025-07-24</Text>
              <Text>15:00</Text>
            </View>

            <Image source={"https://openweathermap.org/img/wn/10d@2x.png"} style={styles.image} />
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              <Text style={styles.temperature}>90°F</Text>
              <Text style={{ fontSize: 16 }}>light rain</Text>
            </View>
          </View>
          {/* --------------------------------------- */}
          <View style={{ width: 250, height: 300, boxShadow:"2px 2px 8px black", borderRadius: 5, margin: 5 }} >
          <View style={{marginTop:10,display:"flex" ,flexDirection:"row",justifyContent:"space-around"}}>
              <Text>2025-07-24</Text>
              <Text>15:00</Text>
            </View>

            <Image source={"https://openweathermap.org/img/wn/10d@2x.png"} style={styles.image} />
            <View style={{flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
              <Text style={styles.temperature}>90°F</Text>
              <Text style={{ fontSize: 16 }}>light rain</Text>
            </View>
          </View>
        </ScrollView>
      </View>
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
    width: "80%",
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
    margin:30,
    flex:1,
    marginTop:20,
    backgroundColor:"lightblue",
    borderRadius:5
  },
  temperature: {
    fontSize: 40,
    fontWeight: "bold"
  }

})

