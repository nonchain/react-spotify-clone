import React from 'react'
import { selectAllPlayer } from '../redux/features/playerSlice';
import { useSelector } from 'react-redux';
import { useGetTopChartsQuery } from '../redux/services/shazamCoreApi';
import { Error, Loader, SongCard } from '../components';

const TopCharts = () => {
   const { isPlaying, activeSong } = useSelector(selectAllPlayer);
   const { data, isFetching, error } = useGetTopChartsQuery();

   if (isFetching) return <Loader title={'Loading top songs'} />
   if (error) return <Error />

   return (
      <React.Fragment>
         <div className="px-6 mt-8 flex flex-col">
            <h2 className='text-3xl font-bold text-white text-left'>Top Songs</h2>
            <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
               {
                  data?.map((item, index) => (
                     item?.artists && <SongCard
                        key={item.key}
                        data={data}
                        song={item}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        index={index}
                        homePage={'Around You'}
                     />
                  ))
               }
            </div>
         </div>
      </React.Fragment>
   )
}

export default TopCharts