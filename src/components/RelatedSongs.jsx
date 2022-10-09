import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { useGetSongRelatedQuery } from '../redux/services/shazamCoreApi';
import {SongCard} from '../components';
import { Loader, Error } from '../components';

const RelatedSongs = ({ songId }) => {
  const { activeSong, isPlaying } = useSelector(selectAllPlayer);
  const { data: relatedData, isFetching, error } = useGetSongRelatedQuery(songId);

  if (isFetching) return <Loader />
  if (error) return <Error />

  return (
    <div className='mt-12 flex flex-col'>
      <h1 className='text-2xl text-white'>Related</h1>
      <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
        {
          relatedData?.map((item, index) => (
            <SongCard
              key={`${item?.key}-${item?.artists[0]?.adamid}`}
              song={item}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={relatedData}
              index={index} />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedSongs