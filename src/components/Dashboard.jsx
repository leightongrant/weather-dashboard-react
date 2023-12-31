import { useState, useEffect } from 'react'
import useOpenWeather from '../hooks/weather'
import WeatherCard from './WeatherCard'
import Query from './Query'
import SearchHistory from './SearchHistory'
import City from './City'
import { last } from 'lodash-es'

export default function Dashboard() {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) ||
      localStorage.setItem('searchHistory', JSON.stringify([]))
  )
  const [cityQuery, setCityQuery] = useState(last(history) || '')
  const [weatherData, setWeatherData] = useState(null)
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${10}&q=${cityQuery}&appid=${
    import.meta.env.VITE_OPENWEATHER_APIKEY
  }`
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
    <div className="container mx-auto">
      <div>
        <h1 className="subpixel-antialiased font-black text-center uppercase text-[#ec7052] flex flex-wrap justify-center">
          <span>Weather</span>
          <span className="text-stone-700">Dashboard</span>
        </h1>
      </div>

      {/* City query */}
      <div className="flex justify-center my-3 ">
        <Query
          setQuery={setCityQuery}
          setHistory={setHistory}
          history={history}
        />
      </div>

      {/* Search History */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-5 ">
        {history.length !== 0 && 'RECENT: '}
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

      {/* Weather Info */}
      <div className="p-5 mt-10 rounded-md bg-opacity-10 bg-stone-400">
        {/* City */}
        <div className="flex flex-col items-center justify-center gap-5 mb-10 text-[#ec7052]">
          {weatherData && <City weatherData={weatherData} />}
        </div>

        {/* Weather Cards */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5">
          {weatherData &&
            weatherData.days.map((day, idx) => (
              <WeatherCard day={day} key={idx} />
            ))}
        </div>
      </div>
    </div>
  )
}
