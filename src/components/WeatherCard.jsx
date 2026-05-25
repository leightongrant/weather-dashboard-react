/**
 * WeatherCard Component
 * 
 * Displays weather details for a single day.
 * - Shows date, weather icon, description, temperature (Hi/Lo), humidity, and wind speed.
 * - Uses a randomized background gradient color from a predefined list.
 * 
 * @param {Object} props.day - The daily weather data object from OpenWeather API.
 */

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { startCase } from 'lodash-es'

export default function WeatherCard({ day }) {
	// Format the date from Unix timestamp
	const date = new Date(day.dt * 1000)
	
	// OpenWeather icon URL
	const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
	
	const cond = `${day.weather[0].main},weather`
	const [back, setBack] = useState(null)

	/**
	 * Returns a random Tailwind 'from-' gradient color class.
	 */
	function getColor() {
		const colors = [
			'from-slate-500',
			'from-gray-500',
			'from-zinc-500',
			'from-stone-500',
			'from-neutral-500',
		]
		const idx = Math.floor(Math.random() * colors.length)
		return colors[idx]
	}

	return (
		<div className='rounded-xl glass'>
			<div
				className={clsx(
					'flex flex-col p-2 pb-8 place-items-center bg-linear-to-t h-full rounded-xl bg-base',
					getColor(),
				)}
			>
				{/* Date Header */}
				<div className='self-start w-full'>
					<div className='flex items-center justify-between'>
						<p className='w-8 text-center '>{date.toDateString().slice(0, 3)}</p>

						<p className='p-1 font-bold drop-shadow-xl'>
							{date.toDateString().slice(4)}
						</p>

						<div className='w-8'></div>
					</div>
				</div>

				{/* Weather Icon */}
				<img
					src={icon}
					alt={`weather icon ${day.weather[0].icon}`}
				/>

				{/* Weather Description */}
				<p className='px-2 mb-2 text-sm font-bold rounded-md bg-base-500 text-primary'>{`${startCase(
					day.weather[0].description,
				)}`}</p>

				{/* Weather Details Grid */}
				<div className='flex flex-wrap gap-4 px-10 text-center'>
					<div>
						{/* Temperature */}
						<div className='flex items-center gap-2'>
							<p className='font-light text-primary'>Lo:</p>
							<p>{`${Math.round(day.temp.min)}°C`}</p>
						</div>
						<div className='flex items-center gap-2'>
							<p className='font-light text-primary'>Hi:</p>
							<p>{`${Math.round(day.temp.max)}°C`}</p>
						</div>
					</div>
					<div>
						{/* Humidity and Wind Speed */}
						<div className='flex items-center gap-2'>
							<p className='font-light text-primary'>Hu:</p>
							<p>{day.humidity} %</p>
						</div>
						<div className='flex items-center gap-2'>
							<p className='font-light text-primary'>Wi:</p>
							<p>{`${Math.round(day.speed)} km/h`}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
