import { useState, useEffect } from 'react'
import useOpenWeather from '../hooks/weather'
import WeatherCard from './WeatherCard'
import Query from './Query'

export default function Dashboard() {
  const [cityQuery, setCityQuery] = useState(
    `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${15}&q=${'London'}&appid=${
      import.meta.env.VITE_OPENWEATHER_APIKEY
    }`
  )
  const [weatherData, setWeatherData] = useState(null)
  const getWeather = useOpenWeather(cityQuery)

  useEffect(() => {
    getWeather
      .then((data) => {
        const sanitizedData = {
          city: `${data.city.name}, ${data.city.country}`,
          days: data.list,
        }
        setWeatherData(sanitizedData)
      })
      .catch((error) => console.log(error))
  }, [cityQuery])
  // console.log(weatherData.days[0])
  return (
    <div className="container grid p-5 mx-auto">
      <h1 className="inline-block text-center text-blue-600 uppercase subpixel-antialiased font-black">
        Weather Dashboard
      </h1>
      <div className="flex justify-center my-8">
        <Query setQuery={setCityQuery} />
      </div>
      <div className="flex items-center gap-5 justify-center mb-10 flex-wrap">
        <h2 className="text-blue-300 uppercase font-extrabold whitespace-nowrap">
          {weatherData && weatherData.city}
        </h2>
        <p className="text-3xl whitespace-nowrap">
          {weatherData && weatherData.days[0].weather[0].description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
        {weatherData &&
          weatherData.days.map((day, idx) => (
            <WeatherCard day={day} key={idx} />
          ))}
      </div>
    </div>
  )
}
