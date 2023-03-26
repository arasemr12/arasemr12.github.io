import axios from "axios";

export default async () => {
    //varmı live? varmı live?
    
    globalThis.user = null;

    setInterval(async() => {
        let res = await axios.get('https://api.lanyard.rest/v1/users/441221465019514881').catch(() => {});
        if(!res.data || !res.data.data) return;
        globalThis.user = res.data.data;
    }, 1000);
    
    console.log('Server started!');
};
