import React from 'react';
import { loader } from '../assets';

const Loader = ({title}) => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-2'>
      <img src={loader} alt="Loading" />
      <h2 className='text-2xl text-white font-bold'>{title || 'Loading ...'}</h2>
    </div>
  )
}

export default Loader
