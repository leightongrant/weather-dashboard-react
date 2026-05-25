/**
 * Dashboard Component
 *
 * This is the main container for the Weather Dashboard application.
 * It manages:
 * - Weather data fetching using React Query.
 * - Search history state and persistence in localStorage.
 * - Coordinate lookups via the OpenWeather Geocoding API.
 * - Global city name state via the Zustand searchStore.
 */

import { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard'
import Query from './Query'
import SearchHistory from './SearchHistory'
import City from './City'
import { last } from 'lodash-es'
import clsx from 'clsx'
import Loading from './Loading'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import Alert from './Alert'
import { useSearchStore } from '../store/searchStore'

export default function Dashboard() {
	// Global state from searchStore (Zustand)
	const cityName = useSearchStore((state) => state.cityName)
	const setCityName = useSearchStore((state) => state.setCityName)
	const queryClient = useQueryClient()

	// React Query for weather data fetching
	const { isPending, error, data, isFetching, refetch } = useQuery({
		queryKey: [cityName],
		queryFn: async () => {
			if (cityName) {
				return await fetchWeather(cityName)
			}
			// Fallback to the last city in history if no current city is set
			if (history && history.length > 0) {
				return await fetchWeather(last(history))
			}
			return null
		},
	})

	// Local state for search history list and alerts
	const [history, setHistory] = useState([])
	const [message, setMessage] = useState('')

	// Initial load: Set the city to the last entry in history if available
	useEffect(() => {
		setCityName(history[-1])
	}, [])

	// Load history from localStorage and save new searches
	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('searchHistory'))
		if (items) {
			setHistory(items)
		}
		if (cityName) {
			manageStorage('searchHistory', cityName)
		}
	}, [cityName])

	/**
	 * Manages local storage for search history, ensuring no duplicates.
	 *
	 * @param {string} key - The localStorage key.
	 * @param {string} value - The city name to add to history.
	 */
	const manageStorage = (key, value) => {
		const items = JSON.parse(localStorage.getItem(key))
		if (!items) {
			localStorage.setItem(key, JSON.stringify([value.toLowerCase()]))
			setHistory([value.toLowerCase()])
			return
		}
		// Avoid duplicates in history
		if (items.includes(value.toLowerCase())) return

		setHistory((pre) => [...pre, value.toLowerCase()])
		items.push(value.toLowerCase())
		localStorage.setItem(key, JSON.stringify(items))
	}

	/**
	 * Fetches geographic coordinates (lat/lon) for a given location name.
	 *
	 * @param {string} location - The city/location name.
	 * @returns {Promise<Array|undefined>} - Array of location results or undefined on error.
	 */
	const getCoords = async (location) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${import.meta.env.VITE_OPENWEATHER_APIKEY}`,
			)
			const data = await response.json()
			if (!data) return null
			return data
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * Fetches 10-day weather forecast data for a specific city.
	 *
	 * @param {string} city - The city name to fetch weather for.
	 * @returns {Promise<Object|null>} - Weather data object or null on failure.
	 */
	async function fetchWeather(city) {
		try {
			const coords = await getCoords(city)

			// Fetch daily forecast using coordinates
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lat=${coords[0].lat}&lon=${coords[0].lon}&cnt=${10}&appid=${import.meta.env.VITE_OPENWEATHER_APIKEY}`,
			)
			const data = await res.json()

			console.log(data)
			return data
		} catch (e) {
			setMessage('City not found')
			console.log(e)
			return null
		} finally {
			// Clear error message after 5 seconds
			setTimeout(() => {
				setMessage('')
			}, 5000)
		}
	}

	if (isFetching) {
		return <Loading />
	}

	return (
		<div className='container mx-auto'>
			{/* Error Alert Display */}
			{message.length > 0 && (
				<Alert
					alertMessage={message}
					setMessage={setMessage}
				/>
			)}

			<h1 className='flex flex-wrap justify-center mt-10 mb-10 subpixel-antialiased font-black text-center uppercase '>
				<span className='text-5xl text-primary'>Weather</span>
				<span className='text-5xl'>Dashboard</span>
			</h1>

			{/* Search input component */}
			<Query setMessage={setMessage} />

			{/* Recent searches history list */}
			<div className='flex flex-wrap items-center justify-center gap-3 py-5 '>
				{history &&
					history.map((search, idx) => (
						<SearchHistory
							search={search}
							key={idx}
							history={history}
							setHistory={setHistory}
						/>
					))}
			</div>

			{/* Weather Results Section */}
			<div className='p-5 mt-10 rounded-md bg-opacity-10'>
				<div className='flex flex-col items-center justify-center gap-5 mb-10'>
					{!data ?
						<p className='text-3xl text-yellow-50'>
							Search for a city to see weather forecast
						</p>
					:	<>
							<h2 className='text-4xl font-extrabold uppercase whitespace-nowrap'>
								{data.city.name}
								{', '}
								{data.city.country}
							</h2>
							<p className='text-3xl capitalize whitespace-nowrap text-primary'>
								{data.list[0].weather[0].description}
							</p>
						</>
					}
				</div>

				{/* 10-day Forecast Cards Grid */}
				<div className='grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xxl:grid-cols-5'>
					{!data ?
						''
					:	data.list.map((day, idx) => (
							<WeatherCard
								day={day}
								key={idx}
							/>
						))
					}
				</div>
			</div>
		</div>
	)
}
