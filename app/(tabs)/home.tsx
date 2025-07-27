import useFetchDaily from '@/hooks/fetchDailyWeather'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
export default function Home() {
    const {dailyTime} = useFetchDaily("");
    
    if(!dailyTime || dailyTime.length === 0 ){
      return <ActivityIndicator size={24} />
    }
      
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
          {[1,2,3,4,5].map((e)=>{
            return ( <View key={e} style={{ width: 250, height: 300, boxShadow: "2px 2px 8px black", borderRadius: 5, margin: 5 }} >
            <View style={{ marginTop: 10,marginBottom:10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              <Text>8478474</Text>
            </View>

           <Text style={{textAlign:"center",marginTop:15}}> <Ionicons name='sunny' size={100} /></Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <Text style={styles.temperature}>90°F</Text>
              <Text style={{ fontSize: 16 }}>light rain</Text>
            </View>
          </View>) 
          })}
         
          
          
        </ScrollView>
      </View>
      <ScrollView horizontal={true} >
      {[1,2,3,4,5].map((e)=>{
        return (
          <View key={e} style={{ width: 250, height: 250, boxShadow: "2px 2px 8px black", borderRadius: 5, margin: 5 }} >
          <View style={{ marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <Text>2025-07-24</Text>
          </View>

          <Text  style={{textAlign:"center",marginTop:15}}><Ionicons name='sunny' size={100}/></Text>          
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <Text style={styles.temperature}>90°F</Text>
            <Text style={{ fontSize: 16 }}>light rain</Text>
          </View>
        </View>

        )
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

