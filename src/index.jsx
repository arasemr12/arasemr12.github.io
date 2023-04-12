import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Index() {
  let [imageUrl, setImageUrl] = useState("");
  let [spotify, setSpotify] = useState({
    listening:false
  });

  function msToSec(ms){
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds%60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  async function getInfo(){
    let res = await fetch("https://api.lanyard.rest/v1/users/441221465019514881");
    let json = await res.json();
    json = json.data;
    if(!json.discord_user.avatar) setImageUrl(`https://cdn.discordapp.com/embed/avatars/${json.discord_user.discriminator.charAt(3)}.png`)
    else setImageUrl(`https://cdn.discordapp.com/avatars/${json.discord_user.id}/${json.discord_user.avatar}.gif`);
    if(!json.spotify) return setSpotify({listening:false});

    let start = json.spotify.timestamps.start;
    json.spotify.timestamps.start = msToSec(Date.now()-json.spotify.timestamps.start);
    json.spotify.timestamps.end = msToSec(json.spotify.timestamps.end-start);

    setSpotify({
      listening:true,
      data:json.spotify
    });
  }

  useEffect(() => {
    setInterval(getInfo, 1000);
  },[]);
  
  return (
    <div onContextMenu={(e) => e.preventDefault()} className="w-full h-full flex flex-col items-center justify-center gap-5">
      <img className="rounded-full animate-bounce" width={128} draggable={false} src={imageUrl} alt="" />
      <h1 className="text-2xl font-bold">arasemr12</h1>
      <span className="text-center">Self taught web/desktop developer. Also learning os/game development.</span>
      {spotify.listening && (

        <div className="flex flex-col w-full items-center lg:w-2/3 bg-gradient-to-tr from-green-600 to-green-400 text-green-100 py-2 px-4 rounded-lg gap-1">
          <div className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-col w-1/3">
              <span>{spotify.data.song}</span>
              <span>{spotify.data.artist}</span>
              <span>{spotify.data.album}</span>
            </div>
            <i className="hidden lg:block fa-brands fa-spotify fa-2x text-center opacity-50 hover:opacity-100 hover:text-purple-200 duration-300"></i>
            <div className="w-1/3 flex flex-col items-end justify-center">
              <img draggable={false} src={spotify.data.album_art_url} className="rounded" width={64} alt="" />
            </div>
          </div>
          <span className="hr"></span>
          <div className="flex flex-row items-center w-full justify-between">
            <span>{spotify.data.timestamps.start}</span>
            <span>{spotify.data.timestamps.end}</span>
          </div>
        </div>
      )}
      <a href="https://github.com/arasemr12" className="py-2 px-4 bg-purple-600 hover:bg-purple-800 duration-300 rounded" target="_blank">Check my github!</a>
      <Link className="cursor-pointer py-2 px-4 bg-purple-600 hover:bg-purple-800 duration-300 rounded" to="/more">Learn more about me!</Link>
    </div>
  )
}

export default Index;
