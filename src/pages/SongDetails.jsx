import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { Loader, Error, RelatedSongs } from '../components';
import { useGetSongDetailsQuery } from '../redux/services/shazamCoreApi';
import { favorite, more } from '../assets';
import PlayPause from '../components/PlayPause';

const SongDetails = () => {
   const [viewMore, setViewMore] = useState(false);
   const { songId } = useParams();
   const location = useLocation();
   const dispatch = useDispatch();
   const { data: songData, isFetching, error } = useGetSongDetailsQuery(songId);
   const { activeSong, isPlaying } = useSelector(selectAllPlayer);

   const {
      song,
      data,
      index,
      homePage
   } = location.state?.data;

   const handelPauseClick = () => {
      dispatch(playPause(false));
   }
   const handelPlayClick = () => {
      dispatch(setActiveSong({ song, data, index }));
      dispatch(playPause(true));
   }

   if (isFetching) return <Loader />
   if (error) return <Error />

   return (
      <React.Fragment>
         <div className='mt-8 flex flex-col'>
            {/*====== HEADER =====*/}
            <div className='w-full h-80 relative overflow-hidden lg:h-96'>
               <img src={songData?.images?.coverart} alt="" className='w-full h-full object-cover' />
               <div className="absolute inset-0 bg-[#00000058] z-10"></div>
               <div className='px-4 py-6 w-full h-full flex flex-col justify-between absolute inset-0 z-20 md:px-8 md:py-10'>
                  <div className="flex items-center justify-between">
                     <span className='text-xs text-gray-300 '>{homePage} / Song Details</span>
                     <img src={more} alt="more" />
                  </div>

                  <div className='flex items-end justify-between'>
                     <div className='flex flex-col'>
                        <h3 className='text-sm text-gray-100'>ARTIST</h3>
                        <Link to={song?.artists ? `/artist/${song?.artists[0]?.adamid}` : '/top-artists'}>
                           <h1 className='text-5xl text-white'>{songData?.subtitle}</h1>
                        </Link>
                     </div>
                     <div className='p-3 w-12 bg-white/80 cursor-pointer flex items-center justify-center overflow-hidden rounded-full hover:bg-white duration-300'>
                        <img src={favorite} alt="favorite" className='' />
                     </div>
                  </div>
               </div>
            </div>
            {/*====== BODY =====*/}
            <div className='px-6 pt-8 flex flex-col md:px-8 md:pt-10'>
               <div className='w-full flex items-center justify-between'>
                  <div className='flex flex-col'>
                     <h1 className='text-3xl text-white font-bold'>{songData?.title}</h1>
                     <p className='text-sm text-white'>Released on : {songData?.releasedate}</p>
                  </div>

                  <PlayPause
                     song={song}
                     isPlaying={isPlaying}
                     activeSong={activeSong}
                     handelPause={handelPauseClick}
                     handelPlay={handelPlayClick}
                     className='w-16 h-16 cursor-pointer' />
               </div>

               <div className='flex flex-col-reverse lg:grid lg:grid-cols-5 lg:gap-x-12'>
                  <div className='lg:col-span-3'>
                     <RelatedSongs songId={songId} />
                  </div>
                  <div className='flex flex-col lg:col-span-2'>
                     <h2 className='mt-6 text-xl text-white font-semibold lg:mt-12'>Lyrics</h2>
                     <p className={`mt-2 overflow-hidden ${viewMore ? '' : 'text-cover h-[230px]'}`}>
                        {
                           songData?.sections[1].type === 'LYRICS' ? songData.sections[1].text.map(
                              (line, i) => (line === '' ? <br key={i} /> : <p className='text-white text-sm' key={i}>{line}</p>)
                           ) : <p className='text-gray-100 text-sm'>No lyrics found!</p>
                        }
                     </p>
                     <button type='button' className='mt-4 text-[#1DB954] text-base font-semibold' onClick={() => setViewMore(!viewMore)}>View {viewMore ? 'less' : 'more'}</button>
                  </div>


               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default SongDetails