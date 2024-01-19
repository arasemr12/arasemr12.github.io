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

const techs = ref([
    {
        name:"Node",
        logo:"fa-brands fa-node fa-2x"
    },
    {
        name:"Vue",
        logo:"fa-brands fa-vuejs fa-2x"
    },
    {
        name:"C/C++",
        logo:"fa-solid fa-c fa-2x"
    },
    {
        name:"Javascript",
        logo:"fa-brands fa-js fa-2x"
    },
    {
        name:"python",
        logo:"fa-brands fa-python fa-2x"
    },
    {
        name:"Go",
        logo:"fa-brands fa-golang fa-2x"
    },
    {
        name:"Java",
        logo:"fa-brands fa-java fa-2x"
    },
]);

const logo = ref("");

const data = ref({});
const techsIn = ref("");
const navbar = ref("");

let get = async() => {
    let res = await useFetch("https://api.lanyard.rest/v1/users/441221465019514881");

    data.value = res.data.value.data;
};

get();

const reTech = () => {
    let tt = document.getElementsByClassName("tech").item(0);

    techs.value.forEach((t) => {
        t.x = Math.random()*(techsIn.value?.clientWidth-tt?.clientWidth);
        t.y = Math.random()*(techsIn.value?.clientHeight-tt?.clientHeight);
    });
};

onMounted(() => {
    if(!process.client) return;
    setInterval(get, 5000);

    reTech();
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

let pos1 = ref(0);
let pos2 = ref(0);
let pos3 = ref(0);
let pos4 = ref(0);

const move = (e) => {
    pos1.value = pos3.value - e.clientX;
    pos2.value = pos4.value - e.clientY;
    pos3.value = e.clientX;
    pos4.value = e.clientY;
    navbar.value.style.top = `${navbar.value.offsetTop - pos2.value}px`;
    navbar.value.style.left = `${navbar.value.offsetLeft - pos1.value}px`;
};

const down = (e) => {
    pos3.value = e.clientX;
    pos4.value = e.clientY;
    document.onmousemove = move;
};

const up = () => {
    document.onmousemove = null;
};
</script>

<template>
    <div v-if="data" class="w-full h-full overflow-auto">
        <div class="b"></div>
        <div @mousedown.prevent="down" @mouseup.prevent="up" ref="navbar" class="z-40 absolute top-2 left-1/2 -translate-x-1/2 bg-gray-800/50 border-2 border-gray-700 backdrop-blur-sm lg:w-2/3 w-full p-2 rounded-full flex flex-row items-center justify-center gap-3 cursor-move">
            <a class="py-2 px-3 bg-gray-800 rounded-full" href="#home"><i class="fa-solid fa-house"></i></a>
            <a class="py-2 px-3 bg-gray-800 rounded-full" href="#about"><i class="fa-solid fa-address-card"></i></a>
            <a class="py-2 px-3 bg-gray-800 rounded-full" href="#techs"><i class="fa-solid fa-microchip"></i></a>
        </div>
        <div @click="notifVisible = !notifVisible" :class="`cursor-pointer z-50 fixed shadow-xl top-5 lg:w-1/2 left-1/2 -translate-x-1/2 w-full bg-gray-800 hover:scale-105 py-2 px-4 rounded-full duration-300 border-[1px] border-gray-600 ${notifVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`">
            <span>{{ notif }}</span>
        </div>
        <div id="home" class="w-full h-full flex items-center justify-center">
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
                        <span class="text-xs">こんにちは、荒瀬です！</span>
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
            </div>
        </div>
        <div id="techs" class="w-full h-full flex items-center justify-center">
            <div class="lg:w-2/3 lg:h-4/5 w-full h-full flex flex-col items-center justify-center gap-3 p-4">
                <div @click="reTech" class="flex flex-row items-center gap-1 cursor-pointer">
                    <span class="text-2xl font-semibold select-none">Technologies I use</span>
                    <i class="fa-solid fa-arrows-rotate text-gray-400 hover:text-white hover:rotate-180 duration-300"></i>
                </div>
                <div ref="techsIn" class="bg-gradient-to-tr relative w-full h-full flex lg:flex-row lg:flex-wrap flex-col items-center justify-between p-4 gap-3 bg-gray-800/50 rounded-lg overflow-auto">
                    <div v-for="tech in techs" :style="{top:`${tech.y}px`,left:`${tech.x}px`}" class="blur-[0.5px] hover:blur-0 w-full lg:w-1/4 select-none bg-gray-800 backdrop-blur-xl hover:bg-gray-700 border-2 border-gray-700 p-4 rounded-lg flex flex-col items-center hover:scale-110 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:-rotate-[1.5deg] duration-300 cursor-move tech">
                        <i :class="`${tech.logo} text-gray-400`"></i>
                        <span>{{ tech.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>