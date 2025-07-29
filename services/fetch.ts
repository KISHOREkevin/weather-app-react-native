import { fetchWeatherApi } from 'openmeteo';
const fetchWeatherData = async (latitudeparam: number|undefined, longitudeparam: number|undefined) => {
try {
  const params = {
    "latitude": latitudeparam,
    "longitude": longitudeparam,
    "daily": ["weather_code", "temperature_2m_max"],
    "hourly": ["temperature_2m", "weather_code"],
    "current": ["temperature_2m", "weather_code"],
    "timezone": "auto",
    "temperature_unit": "fahrenheit",
    "forecast_hours": 24
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

 const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();


const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		temperature_2m: current.variables(0)!.value(),
		weather_code: current.variables(1)!.value(),
	},
	hourly: {
		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		temperature_2m: hourly.variables(0)!.valuesArray(),
		weather_code: hourly.variables(1)!.valuesArray(),
	},
	daily: {
		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		weather_code: daily.variables(0)!.valuesArray(),
		temperature_2m_max: daily.variables(1)!.valuesArray(),
	},
};
 return {dailyWeather:weatherData.daily,hourlyWeather:weatherData.hourly,currentWeather:weatherData.current,latitude,longitude}
} catch (error) {
    throw error
      
}
  }


export default fetchWeatherData;
