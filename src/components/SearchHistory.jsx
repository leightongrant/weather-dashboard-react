import { IoMdCloseCircle } from 'react-icons/io'
import { useRef } from 'react'
import { startCase } from 'lodash-es'
const SearchHistory = ({ search, history, setHistory, setCityQuery }) => {
  const searchRef = useRef()
  function handleClick(e) {
    e.stopPropagation()
    setCityQuery(e.target.textContent)
  }
  function handleClose(e) {
    e.stopPropagation()
    const searchIndex = history.indexOf(searchRef.current.textContent)
    setHistory((pre) => [...pre.toSpliced(searchIndex, 1)])
  }

  return (
    <div
      className="flex items-center gap-3 px-1 py-1 rounded bg-indigo-500/50 hover:cursor-pointer"
      onClick={handleClick}>
      <p ref={searchRef}>{startCase(search)}</p>
      <button className="rounded-lg hover:text-red-500 hover:cursor-auto">
        <IoMdCloseCircle onClick={handleClose} />
      </button>
    </div>
  )
}

export default SearchHistory
