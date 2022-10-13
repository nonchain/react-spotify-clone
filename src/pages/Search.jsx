import React from 'react';
import { useParams } from 'react-router-dom';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { useSelector } from 'react-redux';
import { useGetSearchedSongsQuery } from '../redux/services/shazamCoreApi';
import { Error, Loader, SongCard } from '../components';

const Search = () => {
  const { searchTerm } = useParams();
  const { isPlaying, activeSong } = useSelector(selectAllPlayer);
  const { data, isFetching, error } = useGetSearchedSongsQuery(searchTerm);

  if (isFetching) return <Loader title={'Searching for your song'} />
  if (error) return <Error />

  const result = data?.tracks?.hits;
  console.log(result[0]?.track)

  return (
    <React.Fragment>
      <div className="px-6 mt-4 flex flex-col">
        <h2 className='text-xl font-medium text-white text-left'>
          {result.length} results for 
          <span className='ml-2 text-white text-3xl font-bold'>{searchTerm}</span>
        </h2>
        <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
          {
            result?.map(({ track }, index) => (
              track?.artists && <SongCard
                key={track.key}
                data={data}
                song={track}
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

export default Search;