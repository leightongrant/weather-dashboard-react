import { useState, useEffect } from 'react'
import './App.css'
import useOpenWeather from './hooks/weather'
const numOfCards = [1, 2, 3, 4, 5]
const lat = 52.9259504
const lon = -0.6583851
const city = 'London'
const endPoint = `https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=5&q=${city}&appid=${
  import.meta.env.VITE_OPENWEATHER_APIKEY
}`

function Card({ day }) {
  return (
    <div className="p-5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 border-3">
      <p className="text-lg font-bold">{`${day.weather[0].main}`}</p>
      <p>{`Low: ${Math.round(day.temp.min)}°C`}</p>
      <p>{`High: ${Math.round(day.temp.max)}°C`}</p>
    </div>
  )
}

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null)
  const getData = useOpenWeather()

  useEffect(() => {
    getData
      .then((data) => {
        const responseData = {
          city: `${data.city.name}, ${data.city.country}`,
          days: data.list,
        }
        setWeatherData(responseData)
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

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {weatherData &&
          weatherData.days.map((day, idx) => <Card day={day} key={idx} />)}
      </div>
    </div>
  )
}

export default function App() {
  return <Dashboard />
}
