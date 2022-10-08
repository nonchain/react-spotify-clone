import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { Loader, Error } from '../components';
import { useGetSongDetailsQuery } from '../redux/services/shazamCoreApi';

const SongDetails = () => {
   const { songId } = useParams();
   const dispatch = useDispatch();
   const { data: songData, isFetching} = useGetSongDetailsQuery(songId);
   const { activeSong, isPlaying } = useSelector(selectAllPlayer);

   if(isFetching) return <Loader />
   console.log(songData);

   return (
      <div>
         
      </div>
   )
}

export default SongDetails