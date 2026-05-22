import { IoMdCloseCircle } from 'react-icons/io'
import { useRef } from 'react'
import { startCase } from 'lodash-es'
import { useSearchStore } from '../store/searchStore'
import { useEffect } from 'react'

const SearchHistory = ({ search, history, setHistory }) => {
	const setCityName = useSearchStore((state) => state.setCityName)
	const searchRef = useRef()
	function handleClick(e) {
		e.stopPropagation()
		setCityName(e.target.textContent.toLowerCase())
	}

	function handleClose(e) {
		e.stopPropagation()
		const searchIndex = history.indexOf(searchRef.current.textContent.toLowerCase())

		setHistory((pre) => {
			return [...pre.toSpliced(searchIndex, 1)]
		})

		if (history.length === 1) {
			localStorage.setItem('searchHistory', JSON.stringify([]))
		}
	}
	useEffect(() => {
		localStorage.setItem('searchHistory', JSON.stringify(history))
	}, [history])

	return (
		<div
			className='flex items-center gap-3 px-1 py-1 rounded bg-stone-700/50 hover:cursor-pointer w-fit'
			onClick={handleClick}
		>
			<p ref={searchRef}>{startCase(search)}</p>
			<button className='rounded-lg hover:text-red-500 hover:cursor-auto'>
				<IoMdCloseCircle onClick={handleClose} />
			</button>
		</div>
	)
}

export default SearchHistory
