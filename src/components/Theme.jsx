/**
 * Theme Component
 * 
 * Provides a dropdown selector for changing the UI theme.
 * Updates the `data-theme` attribute on the root HTML element.
 */
import { useEffect, useState } from 'react'
const Theme = () => {
	// Default theme
	const [themeName, setThemeName] = useState('coffee')

	// Update document theme whenever themeName changes
	useEffect(() => {
		setTheme(themeName)
	}, [themeName])

	/**
	 * Sets the data-theme attribute on the root element.
	 * 
	 * @param {string} theme - The theme name (daisyUI theme).
	 */
	const setTheme = (theme) => {
		document.documentElement.setAttribute('data-theme', themeName)
	}

	const handleChange = (e) => {
		setThemeName(e.target.value)
	}

	return (
		<select
			defaultValue='Pick a color'
			className='w-48 select select-ghost'
			onChange={handleChange}
		>
			<option disabled={true}>Pick a theme</option>
			<option value='coffee'>Coffee</option>
			<option value='cupcake'>Cupcake</option>
			<option value='night'>Night</option>
			<option value='sunset'>Sunset</option>
			<option value='retro'>Retro</option>
			<option value='halloween'>Halloween</option>
		</select>
	)
}

export default Theme
