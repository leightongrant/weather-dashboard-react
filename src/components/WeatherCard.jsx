import { useState, useEffect } from 'react'
import { GiWindsock } from 'react-icons/gi'
import { WiHumidity } from 'react-icons/wi'
import {
  LiaTemperatureLowSolid,
  LiaTemperatureHighSolid,
} from 'react-icons/lia'
import useUnsplash from '../hooks/unsplash'
import clsx from 'clsx'

import { startCase } from 'lodash-es'

export default function WeatherCard({ day }) {
  const date = new Date(day.dt * 1000)
  const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
  const cond = day.weather[0].description
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
        setBack(d.results[1].urls.small)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <div
      className="border-0 border-gray-200 rounded-md"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div
        className={clsx(
          'flex flex-col p-2 pb-8 place-items-center bg-gradient-to-t h-auto rounded-md',
          getColor()
        )}>
        <div>
          <img src={icon} alt={`weather icon ${day.weather[0].icon}`} />
        </div>
        <div className="px-10 text-center mb-5">
          <h2 className="text-xl font-medium">{`${startCase(
            day.weather[0].description
          )}`}</h2>

          <p>{date.toDateString()}</p>
        </div>

        <div className="px-10 text-center">
          <div className="flex gap-2 items-center">
            <LiaTemperatureLowSolid />
            <p>{`...${Math.round(day.temp.min)}°C`}</p>
          </div>
          <div className="flex gap-2 items-center">
            <LiaTemperatureHighSolid />
            <p>{`...${Math.round(day.temp.max)}°C`}</p>
          </div>
          <div className="flex gap-2 items-center">
            <WiHumidity />
            <p>...{day.humidity}</p>
          </div>
          <div className="flex gap-2 items-center">
            <GiWindsock />
            <p>{`...${day.speed} km/h`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
