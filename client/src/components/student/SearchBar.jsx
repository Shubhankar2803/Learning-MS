import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate()
  const [input, setInput] = useState(data ? data : '')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/' + input)
  }

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center border border-teal-600 rounded bg-transparent"
      style={{ background: 'transparent' }}
    >
      <img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-10 px-3"
        style={{ background: 'transparent' }}
      />
      <input
        onChange={e => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-700 bg-transparent placeholder-gray-500/80"
        style={{ background: 'transparent' }}
      />
      <button
        type="submit"
        className="bg-teal-600 hover:bg-teal-700 text-white md:px-10 px-7 md:py-3 py-2 mx-1 rounded shadow border border-gray-300"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar