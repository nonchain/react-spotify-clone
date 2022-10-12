import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { Loader, Error, ArtistSongCard } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCoreApi';
import { favorite, more } from '../assets';
import PlayPause from '../components/PlayPause';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const { data: artistData, isFetching, error } = useGetArtistDetailsQuery(artistId);
  const { activeSong, isPlaying } = useSelector(selectAllPlayer);

  if (isFetching) return <Loader />
  if (error) return <Error />

  return (
    <React.Fragment>
      <div className='mt-8 flex flex-col'>
        {/*====== HEADER =====* /}
        {/* <div className='w-full h-80 relative overflow-hidden lg:h-96'>
          <img src={songData?.images?.coverart} alt="" className='w-full h-full object-cover' />
          <div className="absolute inset-0 bg-[#00000058] z-10"></div>
          <div className='px-4 py-6 w-full h-full flex flex-col justify-between absolute inset-0 z-20 md:px-8 md:py-10'>
            <div className="flex items-center justify-between">
              <span className='text-xs text-gray-300 '>Discover / Song Details</span>
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
        </div> */}
        {/*====== BODY =====*/}
        <div className='px-6 pt-8 flex flex-col md:px-8 md:pt-10'>
          {
            console.log(Object.values(artistData?.songs))
          }
          <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
            {
              Object.values(artistData?.songs).map((item, index) => {
                return <ArtistSongCard
                  key={`${item?.id}`}
                  song={item.attributes}

                  data={Object.values(artistData?.songs)}
                  index={index} />
              })
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArtistDetails