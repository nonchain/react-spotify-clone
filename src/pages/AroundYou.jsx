import React, { useState, useEffect } from 'react';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCoreApi';
import axios from 'axios';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
   const [country, setCountry] = useState('');
   const [loading, setLoading] = useState(true);
   const { isPlaying, activeSong } = useSelector(selectAllPlayer);
   const { data, isFetching, error } = useGetSongsByCountryQuery(country);

   useEffect(() => {
      axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=b55a819b188e466cb976af524a3b5a5e')
         .then((res) => setCountry(res?.data?.country_code2))
         .catch((err) => console.log(err))
         .finally(() => setLoading(false));
   }, [country]);

   if (isFetching && loading) return <Loader title={'Loading songs around you'} />
   if (error && country) return <Error />
   console.log(data)

   return (
      <React.Fragment>
         <div className="px-6 mt-8 flex flex-col">
            <h2 className='text-3xl font-bold text-white text-left'>
               Around You
               <span className='ml-2 text-sm font-semibold'>{country}</span>
            </h2>
            <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
               {
                  data?.map((item, index) => (
                     item?.artists && <SongCard
                        key={item.key}
                        data={data}
                        song={item}
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

export default AroundYou