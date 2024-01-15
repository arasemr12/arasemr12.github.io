<script setup>

const links = ref([
    {
        link:"https://www.instagram.com/arasemr1234",
        logo:"fa-brands fa-instagram"
    },
    {
        link:"https://github.com/arasemr12",
        logo:"fa-brands fa-github"
    },
    {
        link:"mailto:arasemr1234@protonmail.com",
        logo:"fa-solid fa-envelope"
    },
    {
        link:"https://anomz.arasemr12.xyz/dashboard/78892ad2620c3bbe",
        logo:"fa-solid fa-a"
    }
]);

const logo = ref("");

const data = ref({});

let get = async() => {
    let res = await useFetch("https://api.lanyard.rest/v1/users/441221465019514881");

    data.value = res.data.value.data;
};

get();

onMounted(() => {
    if(!process.client) return;
    setInterval(get, 5000);

    /*setInterval(() => {
        logo.value.style["border-width"] = `${Math.random()*10}px`;
    }, 200);*/
});

const notifVisible = ref(false);
const notif = ref("");
const notifTimeout = ref("");

const sendNotification = (text) => {
    try {
        clearTimeout(notifTimeout.value);
    } catch (error) {
        
    }

    notifVisible.value = true;
    notif.value = text;

    notifTimeout.value = setTimeout(() => {
        notifVisible.value = false;
    }, 3000);
};

const copy = (text) => {
    navigator.clipboard.writeText(text);
    sendNotification(`${text} copied!`);
};

</script>

<template>
    <div v-if="data" class="w-full h-full overflow-auto">
        <div class="b"></div>
        <div @click="notifVisible = !notifVisible" :class="`cursor-pointer z-50 fixed shadow-xl top-5 lg:w-1/2 left-1/2 -translate-x-1/2 w-full bg-gray-800 hover:scale-105 py-2 px-4 rounded-full duration-300 border-[1px] border-gray-600 ${notifVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`">
            <span>{{ notif }}</span>
        </div>
        <div class="w-full h-full flex items-center justify-center">
            <div class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center pb-12">
                <div class="w-full h-full rounded-full flex flex-col lg:flex-row items-center lg:justify-between justify-center">
                    <div class="flex flex-col w-full items-center lg:items-start">
                        <img src="https://cdn.discordapp.com/embed/avatars/1.png" width="128" draggable="false" class="rounded-full mb-4 lg:hidden" alt="">
                        <div class="flex flex-row items-center gap-3">
                            <a v-for="link in links" class="text-gray-400 hover:text-white hover:-translate-y-[2px] duration-300" target="_blank" :href="link.link">
                                <i :class="link.logo"></i>
                            </a>
                        </div>
                        <h1 class="text-4xl font-bold">arasemr12</h1>
                        <span @click="copy('arasemr1234@protonmail.com')" class="text-gray-400 hover:text-gray-200 duration-300 cursor-pointer">arasemr1234@protonmail.com</span>
                        <div v-if="data.activities" class="relative w-full flex flex-row items-start lg:justify-start justify-center">
                            <a :class="`text-green-400 text-xs flex flex-row items-center gap-1 duration-300 absolute ${data.spotify ? 'opacity-100 visible' : 'opacity-0 invisible'}`" :href="`https://open.spotify.com/track/${data?.spotify?.track_id ?? ''}`" target="_blank">
                                <i class="fa-brands fa-spotify"></i>
                                <span>Listening to {{ data?.spotify?.song ?? "" }} from {{ data?.spotify?.artist ?? "" }}</span>
                            </a>
                            <a :class="`text-purple-400 text-xs flex flex-row items-center gap-1 duration-300 absolute ${!data.spotify && data.activities.filter((e) => e.name == 'Code').length > 0 ? 'opacity-100 visible' : 'opacity-0 invisible'}`" :href="`https://open.spotify.com/track/${data?.spotify?.track_id ?? ''}`" target="_blank">
                                <i class="fa-solid fa-code"></i>
                                <span>{{ data.activities?.filter((e) => e.name == 'Code')[0]?.state ?? '' }} {{ data.activities.filter((e) => e.name == 'Code')[0]?.details ?? '' }}</span>
                            </a>
                            <div :class="`text-yellow-400 text-xs flex flex-row items-center gap-1 duration-300 absolute ${!data.spotify && data.activities.filter((e) => e.name == 'Code').length < 1 ? 'opacity-100 visible' : 'opacity-0 invisible'}`">
                                <i class="fa-solid fa-moon"></i>
                                <span>Idling</span>
                            </div>
                        </div>
                    </div>
                    <div class="hidden lg:flex flex-col">
                        <img ref="logo" src="https://cdn.discordapp.com/embed/avatars/1.png" width="128" draggable="false" class="rounded-full hover:scale-110 duration-300 border-purple-600" alt="">
                    </div>
                </div>
                <a href="#about">
                    <i class="fa-solid fa-chevron-down text-gray-400 hover:text-white hover:-translate-y-[2px] duration-300"></i>
                </a>
            </div>
        </div>
        <div id="about" class="w-full h-full flex items-center justify-center">
            <div class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center gap-3 p-4">
                <span>Hi, I'm Emrah. I started software when I was about 10 years old. I am 15 years old now. I study at an Anatolian high school. I'm interested in video games, guitar and research. My main field is web development, I also develop desktop programs. I am open to job offers. You can reach me via e-mail.</span>
                <div @click="copy('18jZo8m4r6mSyozJb2MfQrH9TG24kPQY4i')" class="flex flex-row items-center gap-1 cursor-pointer">
                    <i class="fa-brands fa-bitcoin text-yellow-400 fa-2x"></i>
                    <span>18jZo8m4r6mSyozJb2MfQrH9TG24kPQY4i</span>
                </div>
                <span>My Features: Javascript, Typescript, Python, Nuxt-Vue, React, C/C++, Tailwind, Go, Java</span>
            </div>
        </div>
    </div>
</template>