import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingBar from "react-top-loading-bar";

function Index() {
  const user = useSelector((e) => e.user).user;
  const loading = useSelector((e) => e.user).loading;

  let [imageUrl, setImageUrl] = useState("");
  let [spotify, setSpotify] = useState({
    listening:false
  });
  
  if(loading || !user) return (
    <div className="fixed flex items-center justify-center w-full h-full z-50">
      <span className="block w-10 h-10 border-[1px] border-gray-600 border-t-gray-400 rounded-full animate-spin z-50"></span>
    </div>
  )
  
  return (
    <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full flex flex-col items-center justify-center gap-5">
      <LoadingBar progress={100}/>
      <img className="rounded-full animate-bounce" width={128} draggable={false} src={user.imageurl} alt="" />
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">arasemr12</h1>
        <span className="text-gray-400">Self taught web & desktop developer</span>
      </div>
      <span className="text-center">I'm a self taught web/desktop developer. I'm also learning os/game development.</span>
      {user.listening_to_spotify && (

        <div className="flex flex-col w-full items-center lg:w-2/3 bg-gradient-to-tr from-green-600 to-green-400 text-green-100 py-2 px-4 rounded-lg gap-1">
          <div className="flex flex-row items-center w-full justify-between whitespace-nowrap">
            <div className="flex flex-col w-1/3">
              <span>{user.spotify.song.slice(0,20)}{user.spotify.song.length > 20 ? '...' : ''}</span>
              <span>{user.spotify.artist.slice(0,20)}{user.spotify.artist.length > 20 ? '...' : ''}</span>
              <span>{user.spotify.album.slice(0,20)}{user.spotify.album.length > 20 ? '...' : ''}</span>
            </div>
            <i className="hidden lg:block fa-brands fa-spotify fa-2x text-center opacity-50 hover:opacity-100 hover:text-purple-200 duration-300"></i>
            <div className="w-1/3 flex flex-col items-end justify-center">
              <img draggable={false} src={user.spotify.album_art_url} className="rounded" width={64} alt="" />
            </div>
          </div>
          <span className="hr"></span>
          <div className="flex flex-row items-center w-full justify-between">
            <span>{user.spotify.timestamps.start}</span>
            <span>{user.spotify.timestamps.end}</span>
          </div>
        </div>
      )}
      <a href="https://github.com/arasemr12" className="py-2 px-4 bg-purple-600 hover:bg-purple-800 duration-300 rounded" target="_blank">Check my github!</a>
      <Link className="cursor-pointer py-2 px-4 bg-purple-600 hover:bg-purple-800 duration-300 rounded" to="/more">Learn more about me!</Link>
    </div>
  )
}

export default Index;
