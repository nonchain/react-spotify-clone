import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex font-main">
      <Sidebar />
      <div className="w-full flex flex-col bg-primary-200">
        <Searchbar />

        <div className="h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route  path="/" >
                <Route index element={<Discover />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-charts" element={<TopCharts />} />
                <Route path="/around-you" element={<AroundYou />} />
                <Route path="/artist/:id" element={<ArtistDetails />} />
                <Route path="/songs/:songId" element={<SongDetails />} />
                <Route path="/search/:searchTerm" element={<Search />} />
              </Route>
            </Routes>
          </div>

        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
