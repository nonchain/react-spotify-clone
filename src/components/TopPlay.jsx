import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCoreApi';
import { selectAllPlayer } from '../redux/features/playerSlice';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from './PlayPause';

import 'swiper/css';
import 'swiper/css/free-mode';
import TopSongCard from './TopSongCard';

const TopPlay = () => {
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector(selectAllPlayer);
  const { data } = useGetTopChartsQuery();
  const topPlay = data?.slice(0, 5);

  

  return (
    <div className='md:mt-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-xl font-semibold'>Top charts</h2>
        <Link to={'/top-charts'}>
          <span className='text-gray-300 text-sm font-medium hover:text-blue-500'>See more</span>
        </Link>
      </div>

      <div className='mt-4 flex flex-wrap justify-center gap-3 sm:justify-start'>
        {
          topPlay?.map((item, index) => (
            <TopSongCard
              key={item.key}
              song={item}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
              index={index} />
          ))
        }
      </div>

      <div className='mt-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-white text-xl font-semibold'>Top artist</h2>
          <Link to={'/top-artists'}>
            <span className='text-gray-300 text-sm font-medium hover:text-blue-500'>See more</span>
          </Link>
        </div>

        <Swiper
          slidesPerView='auto'
          spaceBetween={16}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className='mt-4'
        >
          {
            topPlay?.map((item, index) => (
              <SwiperSlide
                key={item?.key}
                style={{ width: '25%', height: 'auto' }}
                className='rounded-full animate-slideright'
              >
                <Link to={`/artist/${item?.artists[0].adamid}`}>
                  <img src={item?.images.background} alt='artist_image' className='rounded-full object-cover' />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>


    </div>
  )
}

export default TopPlay