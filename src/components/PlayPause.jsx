import React from 'react';
import { play, pause } from '../assets';

const PlayPause = ({ song, isPlaying, activeSong, handelPause, handelPlay, className }) => (
  isPlaying && activeSong.title === song?.title ?
    (<img src={pause} alt='pause' onClick={handelPause} className={className}/>)
    :
    (<img src={play} alt='play' onClick={handelPlay} className={className}/>)
);

export default PlayPause