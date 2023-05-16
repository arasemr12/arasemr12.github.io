import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setLoading, setRepos, setUser } from './redux/slices/userSlice';
import { createHashHistory } from "history";

function msToSec(ms){
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds%60;
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function Loaduser(){
    const dispatch = useDispatch();

    const init = async() => {
        setInterval(async() => {
            let res = await fetch("https://api.lanyard.rest/v1/users/441221465019514881");
            let data = await res.json();

            if(data.success) dispatch(setLoading({
                loading:false
            }));

            data = data.data;

            if(!data.discord_user.avatar) data.imageurl = `https://cdn.discordapp.com/embed/avatars/${data.discord_user.discriminator.charAt(3)}.png`;
            else data.imageurl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;

            
            if(data.spotify){
                let start = data.spotify.timestamps.start;
                data.spotify.timestamps.start = msToSec(Date.now()-data.spotify.timestamps.start);
                data.spotify.timestamps.end = msToSec(data.spotify.timestamps.end-start);
            }

            dispatch(setUser({
                user:data
            }));
        }, 1000);

        setInterval(async() => {
            let res = await fetch("https://api.github.com/users/arasemr12/repos?type=owner");
            let json = await res.json();

            dispatch(setRepos({
                repos:json
            }))
        }, 1000);
    };

    useState(() => {
        init();
    },[]);

    return (<></>);
};

export default Loaduser;
