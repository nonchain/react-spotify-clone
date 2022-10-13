import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  return (
    <form autoComplete='off' className='px-4 w-full h-12 bg-white flex-grow flex items-center gap-2 rounded-full  md:gap-3'>
      <FiSearch />
      <input className='w-full h-full placeholder-gray-500 text-base text-primary-100 font-semibold outline-none '
        type="search"
        value={''}
        onChange={()=> ''}
        placeholder='Search song'
        autoComplete='off' />
    </form>
  )
}

export default Searchbar