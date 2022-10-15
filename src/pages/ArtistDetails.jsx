import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { Loader, Error, ArtistSongCard } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCoreApi';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { data: artistData, isFetching, error } = useGetArtistDetailsQuery(artistId);
  const { activeSong, isPlaying } = useSelector(selectAllPlayer);

  if (isFetching) return <Loader />
  if (error) return <Error />

  const artistsSongs = Object.values(artistData?.songs);
  const artistsData = artistData?.artists[artistId]?.attributes;
  const artistArt = [...artistsData.artwork?.url].slice(0, -13).join('') + '512x512bb.jpg';

  console.log(artistsSongs);
  return (
    <React.Fragment>
      <div className='flex flex-col'>
        {/*====== HEADER =====*/}
        <div className='px-4 w-full flex items-start justify-start gap-4 md:px-8 md:gap-6'>
          <img src={artistArt} alt="" className='w-28 h-28 rounded-lg overflow-hidden object-cover md:w-36 lg:w-44 md:h-36 lg:h-44' />
          <div className='flex flex-col justify-between'>
            <div className='flex items-end justify-between'>
              <div className='h-28 md:h-36 lg:h-44 flex flex-col justify-between'>
                <div className="flex flex-col">
                  <h1 className='text-3xl text-white'>{artistsData?.name}</h1>
                  <div className="flex items-center">
                    {
                      artistsData.genreNames?.map((genre, i) => <p className='text-white text-sm'>{genre}{i < artistsData.genreNames.length - 1 && ' - '}</p>)
                    }
                  </div>
                </div>
                <button className='px-5 py-2 max-w-max rounded-full bg-[#1DB954] text-white text-sm cursor-pointer place-self-end'>Follow</button>
              </div>
            </div>
          </div>
        </div>
        {/*====== BODY =====*/}
        <div className='px-6 pt-8 flex flex-col md:px-8 md:pt-10'>
          <h2 className='text-2xl text-white font-semibold'>Most listened</h2>
          <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
            {
              artistsSongs.map((item, index) => (
                <ArtistSongCard
                  homePage={'Artists details'}
                  key={`${item?.id}`}
                  song={item.attributes}
                  data={artistsSongs}
                  index={index} />
              ))
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ArtistDetails