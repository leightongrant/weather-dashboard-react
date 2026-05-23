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
	const cityName = useSearchStore((state) => state.cityName)
	const setCityName = useSearchStore((state) => state.setCityName)
	const queryClient = useQueryClient()

	const { isPending, error, data, isFetching, refetch } = useQuery({
		queryKey: [cityName],
		queryFn: async () => {
			if (cityName) {
				return await fetchWeather(cityName)
			}
			if (history && history.length > 0) {
				return await fetchWeather(last(history))
			}
			return null
		},
	})

	const [history, setHistory] = useState([])

	const [message, setMessage] = useState('')

	useEffect(() => {
		setCityName(history[-1])
	}, [])

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('searchHistory'))
		if (items) {
			setHistory(items)
		}
		if (cityName) {
			manageStorage('searchHistory', cityName)
		}
	}, [cityName])

	const manageStorage = (key, value) => {
		const items = JSON.parse(localStorage.getItem(key))
		if (!items) {
			localStorage.setItem(key, JSON.stringify([value.toLowerCase()]))
			setHistory([value.toLowerCase()])
			return
		}
		if (items.includes(value.toLowerCase())) return
		setHistory((pre) => [...pre, value.toLowerCase()])
		items.push(value.toLowerCase())
		localStorage.setItem(key, JSON.stringify(items))
	}

	const getCoords = async (location) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${import.meta.env.VITE_OPENWEATHER_APIKEY}`,
			)
			return await response.json()
		} catch (error) {
			console.log(error)
		}
	}

	async function fetchWeather(city) {
		try {
			const coords = await getCoords(city)

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
			{/* Alert */}
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

			{/* City query */}
			<Query setMessage={setMessage} />

			{/* Search History */}
			<div className='flex flex-wrap items-center justify-center gap-3 py-5 '>
				{/* {history && history.length !== 0 && 'RECENT: '} */}
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

			{/* Location */}
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

				{/* Weather Cards */}
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
