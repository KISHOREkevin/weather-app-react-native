import { fetchWeatherApi } from 'openmeteo';
const fetchData = async (latitudeparam: number|undefined, longitudeparam: number|undefined) => {
try {
  const params = {
    "latitude": latitudeparam,
    "longitude": longitudeparam,
    "daily": ["weather_code", "temperature_2m_max"],
    "hourly": ["temperature_2m", "weather_code"],
    "current": ["temperature_2m", "weather_code"],
    "timezone": "auto",
    "temperature_unit": "fahrenheit"
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  return responses[0];

} catch (error) {
    throw error
      
}
  }


export default fetchData;
