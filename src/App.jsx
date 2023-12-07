import { useState, useEffect } from 'react'
import './App.css'
import useOpenWeather from './hooks/weather'
import usePixbay from './hooks/pixbay'

import { upperFirst } from 'lodash-es'
const lat = 52.9259504
const lon = -0.6583851
const cnt = 8
const city = 'London'
const url = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=${cnt}&q=${city}&appid=${
  import.meta.env.VITE_OPENWEATHER_APIKEY
}`

function Card({ day }) {
  const date = new Date(day.dt * 1000)
  const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
  const cond = day.weather[0].description.split(' ').join('%20')
  // const cond = day.weather[0].main
  const getBackgrounds = usePixbay(cond)
  const [back, setBack] = useState(null)

  useEffect(() => {
    getBackgrounds
      .then((d) => {
        const pick = Math.floor(Math.random() * d.hits.length)
        setBack(d.hits[pick]?.webformatURL)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <div
      className="rounded-lg border-3 border border-gray-200"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="p-5 rounded-lg flex flex-col place-items-center bg-gradient-to-r from-indigo-500">
        <div className="px-10 text-center">
          <h2 className="text-xxl font-medium">{`${day.weather[0].main}`}</h2>
          <p className="text-xxl font-medium mt-2">{`${upperFirst(
            day.weather[0].description
          )}`}</p>
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

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {weatherData &&
          weatherData.days.map((day, idx) => <Card day={day} key={idx} />)}
      </div>
    </div>
  )
}

export default function App() {
  return <Dashboard />
}
