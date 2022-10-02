import React from 'react';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCoreApi';

const Discover = () => {
   const { data, isFetching, error } = useGetTopChartsQuery();

   if (isFetching) return <Loader title='Loading songs' />
   if (error) return <Error />

   return (
      <div className='flex flex-col'>
         <div className='mt-4 mb-10 w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between'>
            <h2 className='text-3xl font-bold text-white text-left'>Discover</h2>
            <select
               name=""
               id=""
               onChange={() => { }}
               value='pop'
               className='p-3 mt-5 bg-black text-gray-300 text-sm outline-none rounded-lg sm:mt-0'>
               {
                  genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)
               }
            </select>
         </div>

         <div className='flex flex-wrap justify-center gap-8 sm:justify-start'>
            {
               data?.map((item, index) => {
                  return <SongCard key={item.key} song={item.title} index={index} />
               })
            }
         </div>
      </div>
   )
}

export default Discover;