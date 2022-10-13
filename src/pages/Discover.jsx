import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard, TopPlay } from '../components';
import { genres } from '../assets/constants';
import { useGetSongByGenreQuery } from '../redux/services/shazamCoreApi';
import { selectAllPlayer, selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
   const dispatch = useDispatch();
   const { isPlaying, activeSong, genreListId } = useSelector(selectAllPlayer);
   const { data, isFetching, error } = useGetSongByGenreQuery(genreListId || 'POP');

   if (isFetching) return <Loader title='Loading songs' />
   if (error) return <Error />
   const genreTitle = genres.find(({value}) => value === genreListId)?.title;

   return (
      <div className='px-6 flex flex-col-reverse lg:grid lg:gap-12 lg:grid-cols-3 xl:gap-14'>

         <div className='flex flex-col lg:col-span-2'>
            <div className='mt-4 mb-10 w-full flex flex-col items-center justify-center sm:flex-row sm:justify-between'>
               <h2 className='text-3xl font-bold text-white text-left'>Discover {genreTitle}</h2>
               <select
                  name=""
                  id=""
                  onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                  value={genreListId || 'pop'}
                  className='p-3 mt-5 bg-black text-gray-300 text-sm outline-none rounded-lg sm:mt-0'>
                  {
                     genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)
                  }
               </select>
            </div>

            <div className='flex flex-wrap justify-center gap-3 sm:justify-start'>
               {
                  data?.map((item, index) => (
                     <SongCard
                        key={item.key}
                        song={item}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        index={index} />
                  ))
               }
            </div>
         </div>
         <div className="xl:sticky relative top-0 h-fit lg:col-span-1">
            <TopPlay />
         </div>
      </div>
   )
}

export default Discover;