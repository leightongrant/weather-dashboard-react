import { useState, useEffect } from 'react'
// import useUnsplash from '../hooks/unsplash'
import clsx from 'clsx'

import { startCase } from 'lodash-es'
// import { useQueryClient, useQuery } from '@tanstack/react-query'

export default function WeatherCard({ day }) {
	// const queryClient = useQueryClient()
	const date = new Date(day.dt * 1000)
	const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
	const cond = `${day.weather[0].main},weather`
	// const getBackgrounds = useUnsplash(cond)
	const [back, setBack] = useState(null)

	// const { isPending, error, data, isFetching } = useQuery({
	// 	queryKey: ['unsplash'],
	// 	queryFn: async () => {
	// 		const response = await fetch('https://api.github.com/repos/TanStack/query')
	// 		return await response.json()
	// 	},
	// })

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

	// useEffect(() => {
	// 	getBackgrounds
	// 		.then((d) => {
	// 			const rIdx = Math.floor(Math.random() * d.results.length)
	// 			setBack(d.results[rIdx].urls.small)
	// 		})
	// 		.catch((e) => console.log(e))
	// }, [cond])

	return (
		<div
			className='rounded-xl glass'
			// style={{
			// 	backgroundImage: `url(${back})`,
			// 	backgroundRepeat: 'no-repeat',
			// 	backgroundSize: 'cover',
			// 	backgroundPosition: 'center',
			// }}
		>
			<div
				className={clsx(
					'flex flex-col p-2 pb-8 place-items-center bg-linear-to-t h-full rounded-xl bg-base',
					getColor(),
				)}
			>
				<div className='self-start w-full'>
					<div className='flex items-center justify-between'>
						<p className='w-8 text-center '>{date.toDateString().slice(0, 3)}</p>

						<p className='p-1 font-bold drop-shadow-xl'>
							{date.toDateString().slice(4)}
						</p>

						<div className='w-8'></div>
					</div>
				</div>

				<img
					src={icon}
					alt={`weather icon ${day.weather[0].icon}`}
				/>

				<p className='px-2 mb-2 text-sm font-bold rounded-md bg-base-500 text-primary'>{`${startCase(
					day.weather[0].description,
				)}`}</p>

				<div className='flex flex-wrap gap-4 px-10 text-center'>
					<div>
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
