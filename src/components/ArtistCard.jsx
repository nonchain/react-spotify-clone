import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({track}) => {
  const navigate = useNavigate()

  return (
    <div className='w-full flex flex-col gap-2 rounded-lg overflow-hidden lg:gap-3' onClick={()=> navigate(`/artist/${track?.artists[0].adamid}`)}>
      <img src={track?.images?.background} alt="artist" className='w-full object-cover rounded-lg overflow-hidden cursor-pointer duration-300 hover:scale-105'/>
      <p className='text-sm text-white font-semibold'>{track?.subtitle}</p>
    </div>
  )
}

export default ArtistCard