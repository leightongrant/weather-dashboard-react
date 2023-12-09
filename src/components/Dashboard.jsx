import { useState, useEffect } from 'react'
import useOpenWeather from '../hooks/weather'
import WeatherCard from './WeatherCard'
import Search from './Search'
import MyCombobox from './Combo'
import Query from './Query'

// const cnt = 15
// const city = 'Tokyo'
// let url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${cnt}&q=${city}&appid=${
//   import.meta.env.VITE_OPENWEATHER_APIKEY
// }`

export default function Dashboard() {
  const [query, setQuery] = useState(
    `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${15}&q=${'London'}&appid=${
      import.meta.env.VITE_OPENWEATHER_APIKEY
    }`
  )
  const [weatherData, setWeatherData] = useState(null)
  const getWeather = useOpenWeather(query)

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
  }, [query])

  return (
    <div className="container grid p-5 mx-auto">
      <h1 className="inline-block text-center text-blue-600 uppercase subpixel-antialiased font-black">
        Weather Dashboard
      </h1>
      <div className="flex justify-center my-8">
        {/* <Search /> */}
        {/* <MyCombobox /> */}
        <Query setQuery={setQuery} />
      </div>
      <h2 className="inline-block mb-6 text-center text-blue-300 uppercase">
        {weatherData && weatherData.city}
      </h2>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
        {weatherData &&
          weatherData.days.map((day, idx) => (
            <WeatherCard day={day} key={idx} />
          ))}
      </div>
    </div>
  )
}
