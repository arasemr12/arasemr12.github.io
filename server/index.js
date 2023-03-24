import axios from "axios";

export default async () => {
    globalThis.user = null;

    setInterval(async() => {
        let res = await axios.get('https://api.lanyard.rest/v1/users/441221465019514881');
        globalThis.user = res.data.data;
    }, 1000);
    
    console.log('Server started!');
};
