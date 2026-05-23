import { useEffect, useState } from 'react'
const Theme = () => {
	const [themeName, setThemeName] = useState('coffee')

	useEffect(() => {
		setTheme(themeName)
	}, [themeName])

	const setTheme = (theme) => {
		document.documentElement.setAttribute('data-theme', themeName)
	}

	return (
		<select
			defaultValue='Pick a color'
			className='w-48 select select-ghost'
			onChange={(e) => setThemeName(e.target.value)}
		>
			<option disabled={true}>Pick a theme</option>
			<option value='coffee'>Coffee</option>
			<option value='cupcake'>Cupcake</option>
			<option value='night'>Night</option>
			<option value='sunset'>Sunset</option>
			<option value='emerald'>Emerald</option>
			<option value='retro'>Retro</option>
			<option value='halloween'>Halloween</option>
		</select>
	)
}

export default Theme
