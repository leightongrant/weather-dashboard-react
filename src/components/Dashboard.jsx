import { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard'
import Query from './Query'
import SearchHistory from './SearchHistory'
import City from './City'
import { last } from 'lodash-es'
import clsx from 'clsx'
import { RotatingLines } from 'react-loader-spinner'

export default function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) ||
      localStorage.setItem('searchHistory', JSON.stringify([]))
  )
  const [weatherData, setWeatherData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    history && localStorage.setItem('searchHistory', JSON.stringify(history))
  }, [history])

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${10}&q=${city}&appid=${
      import.meta.env.VITE_OPENWEATHER_APIKEY
    }`
    try {
      const res = await fetch(url)
      const data = await res.json()

      if (!res.ok) {
        console.log(res.statusText)
        setNotFound(true)
      }

      if (res.ok) {
        const sanitizedData = {
          city: `${data.city.name}, ${data.city.country}`,
          days: data.list,
        }
        setWeatherData(sanitizedData)
        setLoading(false)

        if (!history.includes(city)) {
          setHistory((pre) => [...pre, city.toLowerCase()])
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (loading)
    return (
      <div
        style={{ backgroundColor: 'transparent', height: '90vh' }}
        className="flex items-center justify-center">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="orange"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )

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
          setHistory={setHistory}
          history={history}
          setLoading={setLoading}
          setWeatherData={setWeatherData}
          fetchWeather={fetchWeather}
        />
      </div>

      {/* Search History */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-5 ">
        {history && history.length !== 0 && 'RECENT: '}
        {history &&
          history.map((search, idx) => (
            <SearchHistory
              search={search}
              key={idx}
              history={history}
              setHistory={setHistory}
              fetchWeather={fetchWeather}
            />
          ))}
      </div>

      {/* Not Found */}
      <div className="flex justify-center my-3">
        <div
          role="alert"
          className={clsx(
            'alert alert-warning flex justify-between',
            !notFound && 'hidden'
          )}>
          <p className="text-lg text-black">City not found!</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setNotFound(false)}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="p-5 mt-10 rounded-md bg-opacity-10 bg-stone-400">
        <div className="flex flex-col items-center justify-center gap-5 mb-10 text-[#ec7052]">
          {!weatherData ? '' : <City weatherData={weatherData} />}
        </div>

        {/* Weather Cards */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5">
          {!weatherData ? (
            <>
              <h2></h2>
              <h2 style={{ textAlign: 'center' }}>
                Enter a city name to display the weather
              </h2>
              <h2></h2>
            </>
          ) : (
            weatherData.days.map((day, idx) => (
              <WeatherCard day={day} key={idx} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
