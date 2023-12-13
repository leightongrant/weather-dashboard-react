import { useState, useEffect } from 'react'
import useOpenWeather from '../hooks/weather'
import WeatherCard from './WeatherCard'
import Query from './Query'
import SearchHistory from './SearchHistory'
import { startCase } from 'lodash-es'

export default function Dashboard() {
  const [cityQuery, setCityQuery] = useState('')
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${12}&q=${cityQuery}&appid=${
    import.meta.env.VITE_OPENWEATHER_APIKEY
  }`
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) ||
      localStorage.setItem('searchHistory', JSON.stringify([]))
  )

  const [weatherData, setWeatherData] = useState(null)
  const getWeather = useOpenWeather(url)

  useEffect(() => {
    history && localStorage.setItem('searchHistory', JSON.stringify(history))
  }, [history])

  useEffect(() => {
    cityQuery &&
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
  //console.log(typeof history)
  return (
    <div className="container grid p-5 mx-auto">
      <h1 className="inline-block subpixel-antialiased font-black text-center text-blue-600 uppercase">
        Weather Dashboard
      </h1>
      <div className="flex justify-center my-3">
        <Query
          setQuery={setCityQuery}
          setHistory={setHistory}
          history={history}
        />
      </div>
      <div className="flex justify-center gap-3 py-5">
        {history &&
          history.map((search, idx) => (
            <SearchHistory
              search={search}
              setCityQuery={setCityQuery}
              key={idx}
              history={history}
              setHistory={setHistory}
            />
          ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
        <h2 className="font-extrabold text-blue-300 uppercase whitespace-nowrap">
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
