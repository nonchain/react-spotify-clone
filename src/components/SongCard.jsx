import React from 'react';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

import { favorite } from '../assets'

const SongCard = ({ song, index, data, isPlaying, activeSong }) => {
  const dispatch = useDispatch();

  const handelPauseClick = () => {
    dispatch(playPause(false));
  }
  const handelPlayClick = () => {
    dispatch(setActiveSong({song, data, index}));
    dispatch(playPause(true));
  }

  return (
    <div className='w-full grid grid-cols-5 backdrop-blur-sm cursor-pointer justify-between items-center opacity-80 animate-slideup'>
      {/*===== IMAGE =====*/}
      <div className='relative w-14 h-14 overflow-hidden group'>
        <div className={`absolute items-center justify-center bg-black bg-opacity-50 group-hover:flex group-hover:inset-0 ${activeSong?.title === song?.title ? 'flex bg-black inset-0 bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handelPause={handelPauseClick}
            handelPlay={handelPlayClick} />
        </div>
        <img src={song.images?.coverart} alt="song_img" className='w-full h-full rounded-lg  overflow-hidden object-cover' />
      </div>
      {/*===== TITLE & ARTIST =====*/}
      <div className='ml-2 col-span-3 truncate flex flex-col gap-1'>
        <Link to={`/songs/${song?.key}`}>
          <h2 className='text-base text-white font-semibold truncate'>{song.title}</h2>
        </Link>
        <Link to={song?.artists ? `/artist/${song?.artists[0]?.adamid}` : '/top-artists'}>
          <p className='text-xs text-gray-300 font-medium truncate'>{song.subtitle}</p>
        </Link>
      </div>

      <div className='flex items-center justify-end'>
        <img src={favorite} alt="favorite_icon" className='text-green-500' />
      </div>
    </div>
  )
}

export default SongCard