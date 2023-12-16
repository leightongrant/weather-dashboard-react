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
  const cond = `${day.weather[0].main}%20town`
  const getBackgrounds = useUnsplash(cond)
  const [back, setBack] = useState(null)

  function getColor() {
    const colors = [
      'from-slate-950',
      'from-gray-900',
      'from-zinc-950',
      'from-stone-900',
      'from-neutral-950',
    ]
    const idx = Math.floor(Math.random() * colors.length)
    return colors[idx]
  }

  useEffect(() => {
    getBackgrounds
      .then((d) => {
        const rIdx = Math.floor(Math.random() * d.results.length)
        setBack(d.results[rIdx].urls.small)
      })
      .catch((e) => console.log(e))
  }, [cond])

  return (
    <div
      className="rounded-md"
      style={{
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div
        className={clsx(
          'flex flex-col p-2 pb-8 place-items-center bg-gradient-to-t h-full rounded-md',
          getColor()
        )}>
        <div className="self-start w-full">
          <div className="flex items-center justify-between">
            <div className="p-1 text-black bg-white rounded-lg shadow-md day shadow-slate-700">
              <p className="w-8 text-center ">
                {date.toDateString().slice(0, 3)}
              </p>
            </div>
            <div className="">
              <p className="p-1 font-bold drop-shadow-xl">
                {date.toDateString().slice(4)}
              </p>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        <div>
          <img src={icon} alt={`weather icon ${day.weather[0].icon}`} />
        </div>
        <div className="px-10 mb-5 text-center">
          <h2 className="text-sm font-bold mb-2 bg-stone-900 px-2 rounded-md text-[#ec7052]">{`${startCase(
            day.weather[0].description
          )}`}</h2>
        </div>

        <div className="flex flex-wrap gap-4 px-10 text-center">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-light text-[#ec7052]">L:</p>
              <p>{`${Math.round(day.temp.min)}°C`}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-light text-[#ec7052]">H:</p>
              <p>{`${Math.round(day.temp.max)}°C`}</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-light text-[#ec7052]">HM:</p>
              <p>{day.humidity} %</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-light text-[#ec7052]">WD:</p>
              <p>{`${Math.round(day.speed)} km/h`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
