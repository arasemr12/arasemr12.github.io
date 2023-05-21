import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingBar from "react-top-loading-bar";

function Index() {
  const user = useSelector((e) => e.user).user;
  const loading = useSelector((e) => e.user).loading;
  
  if(loading || !user) return (
    <div className="fixed flex items-center justify-center w-full h-full z-50">
      <span className="block w-10 h-10 border-[1px] border-gray-600 border-t-gray-400 rounded-full animate-spin z-50"></span>
    </div>
  );
  
  return (
    <div onContextMenu={(e) => e.preventDefault()} className="lg:w-2/3 lg:h-2/3 w-full h-full anim border-[1px] border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-5">
      <img className="rounded-full profile" width={128} draggable={false} src={user.imageurl} alt="" />
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">arasemr12</h1>
        <span className="text-gray-300">Self taught web & desktop developer</span>
        <span className="text-xs text-gray-400">arasemr1234@protonmail.com</span>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-5">
        <a href="https://github.com/arasemr12" target="_blank"><i class="fa-brands fa-github fa-2x ic"></i></a>
        <Link to="/more"><i class="fa-solid fa-circle-info fa-2x ic"></i></Link>
      </div>
      {user.listening_to_spotify && (
        <div className="flex flex-col w-full items-center bg-gradient-to-tr from-purple-600 to-blue-400 text-green-100 py-2 px-4 rounded-lg gap-1">
          <div className="flex flex-row items-center w-full justify-between whitespace-nowrap">
            <div className="flex flex-col w-1/3">
              <span>{user.spotify.song.slice(0,20)}{user.spotify.song.length > 20 ? '...' : ''}</span>
              <span>{user.spotify.artist.slice(0,20)}{user.spotify.artist.length > 20 ? '...' : ''}</span>
              <span>{user.spotify.album.slice(0,20)}{user.spotify.album.length > 20 ? '...' : ''}</span>
            </div>
            <i className="fa-brands fa-spotify fa-2x spotify_icon"></i>
            <div className="w-1/3 flex flex-col items-end justify-center">
              <img draggable={false} src={user.spotify.album_art_url} className="rounded" width={64} alt="" />
            </div>
          </div>
          <span className="w-full h-1 block bg-gray-400 rounded-full">
            <span style={{
              width:`${user.spotify.timestamps.played.toFixed(0)}%`
            }} className={`h-1 block bg-white rounded-full duration-300`}></span>
          </span>
          <div className="flex flex-row items-center w-full justify-between">
            <span>{user.spotify.timestamps.start}</span>
            <span>{user.spotify.timestamps.end}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Index;
