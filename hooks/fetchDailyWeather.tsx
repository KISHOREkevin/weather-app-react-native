import fetchData from "@/services/fetch";
import getLocation from "@/services/location";
import { useEffect, useState } from "react"

export default function useFetchDaily(place:string) {
  let [dailyTemp,setDailyTemp] = useState<any>();
  let [dailyCode,setDailyCode] = useState<any>();
  let [dailyTime,setDailyTime] = useState<any>();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const location =  await getLocation(place);
        const data = await fetchData(location?.latitude,location?.longitude);
        const daily = data.daily()!;
        const utcOffsetSeconds = data.utcOffsetSeconds();
        const weatherData = {
          daily: {
            time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
              (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
          },
        }

        setDailyTime(weatherData.daily.time)
        setDailyCode(weatherData.daily.weatherCode)
        setDailyTemp(weatherData.daily.temperature2mMax)
        

      } catch (error) {
        console.log(error);

      }
    }

    getData();
  }, [])

  return {dailyTime,dailyCode,dailyTemp}; 
}
