import React from 'react';
import { play, pause } from '../assets';

const PlayPause = ({ song, isPlaying, activeSong, handelPause, handelPlay }) => (
  isPlaying && activeSong.title === song?.title ?
    (<img src={pause} alt='pause' onClick={handelPause}/>)
    :
    (<img src={play} alt='play' onClick={handelPlay}/>)
);

export default PlayPause