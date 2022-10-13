import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const inputValidationHandler = (e) => {
    const value = e.target.value;
    if (value.length < 3) {
      setValid(false);
    }
    else {
      setValid(true);
    }
    setSearchTerm(value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  return (
    <form onSubmit={submitHandler} autoComplete='off' className={`${valid ? 'pl-2' : 'pl-4'}  pr-4 w-full h-12 bg-white flex-grow flex items-center gap-2 rounded-full  md:gap-3`}>
      <button className={`${valid && 'px-3 py-2 bg-[#1DB954] flex gap-3 items-center rounded-full cursor-pointer;'} duration-300`}>
        <span className={`${!valid && 'hidden'} text-white text-sm font-medium`}>Search</span>
        <FiSearch className={`${valid && 'text-white'} duration-300`} />
      </button>
      <input className='w-full h-full placeholder-gray-500 text-base text-primary-100 font-semibold outline-none '
        type="search"
        value={searchTerm}
        onChange={inputValidationHandler}
        placeholder='Search song'
        autoComplete='off' />
    </form>
  )
}

export default Searchbar