/**
 * SearchHistory Component
 * 
 * Represents a single search history item (pill).
 * - Clicking the pill sets it as the active city.
 * - Clicking the close icon removes it from history and localStorage.
 */

import { IoMdCloseCircle } from 'react-icons/io'
import { useRef } from 'react'
import { startCase } from 'lodash-es'
import { useSearchStore } from '../store/searchStore'
import { useEffect } from 'react'

const SearchHistory = ({ search, history, setHistory }) => {
	const setCityName = useSearchStore((state) => state.setCityName)
	const searchRef = useRef()

	/**
	 * Sets the clicked history item as the active search city.
	 */
	function handleClick(e) {
		e.stopPropagation()
		setCityName(e.target.textContent.toLowerCase())
	}

	/**
	 * Removes the history item from state and updates localStorage.
	 */
	function handleClose(e) {
		e.stopPropagation()
		const searchIndex = history.indexOf(searchRef.current.textContent.toLowerCase())

		// Remove the item using toSpliced (non-mutating)
		setHistory((pre) => {
			return [...pre.toSpliced(searchIndex, 1)]
		})

		// Special case: if it was the last item, ensure localStorage is cleared
		if (history.length === 1) {
			localStorage.setItem('searchHistory', JSON.stringify([]))
		}
	}

	// Persist history changes to localStorage whenever the history state updates
	useEffect(() => {
		localStorage.setItem('searchHistory', JSON.stringify(history))
	}, [history])

	return (
		<div
			className='flex items-center gap-3 px-1 py-0 hover:cursor-pointer w-fit btn rounded-4xl btn-primary'
			onClick={handleClick}
		>
			<p ref={searchRef}>{startCase(search)}</p>
			<button className='rounded-lg hover:text-red-300 hover:cursor-auto'>
				<IoMdCloseCircle onClick={handleClose} />
			</button>
		</div>
	)
}

export default SearchHistory
