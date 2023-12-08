import { useState, useEffect } from 'react'
import './App.css'
import useOpenWeather from './hooks/weather'
import useUnsplash from './hooks/unsplash'
import clsx from 'clsx'

import { upperFirst, capitalize, startCase } from 'lodash-es'
const lat = 52.9259504
const lon = -0.6583851
const cnt = 15
const city = 'Montreal'
const url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${cnt}&q=${city}&appid=${
  import.meta.env.VITE_OPENWEATHER_APIKEY
}`

function Card({ day }) {
  const date = new Date(day.dt * 1000)
  const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
  const cond = day.weather[0].description.split(' ').join(',')
  // const cond = day.weather[0].main
  const getBackgrounds = useUnsplash(cond)
  const [back, setBack] = useState(null)

  function getColor() {
    const colors = [
      'from-sky-950',
      'from-indigo-950',
      'from-violet-950',
      'from-teal-950',
      'from-rose-950',
      'from-zinc-950',
      'from-stone-950',
      'from-neutral-950',
    ]
    const idx = Math.floor(Math.random() * colors.length)
    return colors[idx]
  }

  useEffect(() => {
    getBackgrounds
      .then((d) => {
        // const pick = Math.floor(Math.random() * d.results.length)
        setBack(d.results[1].urls.regular)
        // console.log(d.results[1].urls.regular)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <div
      className="border border-gray-200 rounded-lg border-3"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div
        className={clsx(
          'flex flex-col p-5 rounded-lg place-items-center bg-gradient-to-r',
          getColor()
        )}>
        <div className="px-10 text-center">
          <h2 className="mb-5 text-xl font-medium">{`${startCase(
            day.weather[0].description
          )}`}</h2>
          {/* <p className="mt-2 font-medium text-xxl">{`${upperFirst(
            day.weather[0].description
          )}`}</p> */}
          <p>{date.toDateString()}</p>
        </div>
        <div>
          <img src={icon} alt={`weather icon ${day.weather[0].icon}`} />
        </div>
        <div className="px-10 text-center">
          <p>{`Low: ${Math.round(day.temp.min)}°C`}</p>
          <p>{`High: ${Math.round(day.temp.max)}°C`}</p>
          <p>{`Humidity: ${day.humidity}`}</p>
          <p>{`Wind Speed: ${day.speed} kph`}</p>
        </div>
      </div>
    </div>
  )
}

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null)
  const getWeather = useOpenWeather(url)
  // const getUnsplash = useUnsplash()

  // useEffect(() => {
  //   getUnsplash.then((d) => console.log(d)).catch((e) => console.log(e))
  // }, [])

  useEffect(() => {
    getWeather
      .then((data) => {
        const sanitizedData = {
          city: `${data.city.name}, ${data.city.country}`,
          days: data.list,
        }
        //console.log(sanitizedData)
        setWeatherData(sanitizedData)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="container grid p-5 mx-auto">
      <h1 className="inline-block mb-6 text-center text-blue-600 uppercase">
        Weather Dashboard
      </h1>
      <h2 className="inline-block mb-6 text-center text-blue-300 uppercase">
        {weatherData && weatherData.city}
      </h2>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {weatherData &&
          weatherData.days.map((day, idx) => <Card day={day} key={idx} />)}
      </div>
    </div>
  )
}

export default function App() {
  return <Dashboard />
}
