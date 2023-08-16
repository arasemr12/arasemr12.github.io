import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from ".";
import More from "./more";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setRepos, setUser } from "./redux/slices/userSlice";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Index/>,
    },
    {
      path:"/more",
      element: <More/>
    }
]);

const App = () => {
  const dispatch = useDispatch();

  const msToSec = (ms) => {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds%60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const getUser = async() => {
    let res = await fetch("https://api.lanyard.rest/v1/users/441221465019514881");
    let data = await res.json();

    dispatch(setLoading({
      loading:false
    }));

    data = data.data;

    if(!data.discord_user.avatar) data.imageurl = `https://cdn.discordapp.com/embed/avatars/1.png`;
    else data.imageurl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
    
    if(data.spotify){
        let start = data.spotify.timestamps.start;
        let end = data.spotify.timestamps.end;
        data.spotify.timestamps.start = msToSec(Date.now()-start);
        data.spotify.timestamps.end = msToSec(end-start);
        data.spotify.timestamps.played = ((Date.now()-start) / (end-start))*100;
    }

    dispatch(setUser({
        user:data
    }));

    setTimeout(getUser, 1000);
  };

  const getRepos = async() => {
    let res = await fetch("https://api.github.com/users/arasemr12/repos?type=owner");
    let json = await res.json();

    if(json.message.includes("API rate limit")) return;

    dispatch(setRepos({
        repos:json
    }));
  };

  const init = async() => {
    getUser();
    getRepos();
  };

  useEffect(() => {
    init();
  },[]);

  return (
      <>
        <RouterProvider router={router} />
      </>
  )
};

export default App;
