import React from 'react'
import { selectAllPlayer } from '../redux/features/playerSlice';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCoreApi';
import { Error, Loader, ArtistCard } from '../components';

const TopArtists = () => {
   const { isPlaying, activeSong } = useSelector(selectAllPlayer);
   const { data, isFetching, error } = useGetTopChartsQuery();

   if (isFetching) return <Loader title={'Loading top songs'} />
   if (error) return <Error />

   console.log(data);
   return (
      <React.Fragment>
         <div className="px-6 mt-8 flex flex-col">
            <h2 className='text-3xl font-bold text-white text-left'>Top Songs</h2>
            <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 sm:mt-6 lg:grid-cols-4 lg:gap-8'>
               {
                  data?.map((item, index) => (
                     item?.artists && item?.artists && <ArtistCard
                        key={item.key}
                        track={item}
                     />
                  ))
               }
            </div>
         </div>
      </React.Fragment>
   )
}

export default TopArtists;