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

const data = ref({});

let get = async() => {
    let res = await useFetch("https://api.lanyard.rest/v1/users/441221465019514881");

    data.value = res.data.value.data;
};

get();

onMounted(() => {
    if(!process.client) return;
    setInterval(get, 5000);
});

</script>

<template>
    <div v-if="data" class="w-full h-full overflow-auto">
        <div class="w-full h-full flex items-center justify-center">
            <div class="lg:w-2/3 w-full h-full flex flex-col items-center justify-center pb-12">
                <div class="w-full h-full flex flex-col lg:flex-row items-center lg:justify-between justify-center">
                    <div class="flex flex-col w-full items-center lg:items-start">
                        <img src="https://cdn.discordapp.com/embed/avatars/1.png" width="128" draggable="false" class="rounded-full mb-4 lg:hidden" alt="">
                        <div class="flex flex-row items-center gap-3">
                            <a v-for="link in links" class="text-gray-400 hover:text-white hover:-translate-y-[2px] duration-300" target="_blank" :href="link.link">
                                <i :class="link.logo"></i>
                            </a>
                        </div>
                        <h1 class="text-4xl font-bold">arasemr12</h1>
                        <a href="mailto:arasemr1234@protonmail.com" target="_blank" class="text-gray-400">arasemr1234@protonmail.com</a>
                        <div class="relative w-full flex flex-row items-start lg:justify-start justify-center">
                            <a :class="`text-green-400 text-xs flex flex-row items-center gap-1 duration-300 absolute ${data.spotify ? 'opacity-100 visible' : 'opacity-0 invisible'}`" :href="`https://open.spotify.com/track/${data?.spotify?.track_id ?? ''}`" target="_blank">
                                <i class="fa-brands fa-spotify"></i>
                                <span>Listening to {{ data?.spotify?.song ?? "" }} from {{ data?.spotify?.artist ?? "" }}</span>
                            </a>
                            <div :class="`text-yellow-400 text-xs flex flex-row items-center gap-1 duration-300 absolute ${data.spotify ? 'opacity-0 invisible' : 'opacity-100 visible'}`">
                                <i class="fa-solid fa-moon"></i>
                                <span>Hang out</span>
                            </div>
                        </div>
                    </div>
                    <div class="hidden lg:flex flex-col">
                        <img src="https://cdn.discordapp.com/embed/avatars/1.png" width="128" draggable="false" class="rounded-full" alt="">
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
                <div class="flex flex-row items-center gap-1">
                    <i class="fa-brands fa-bitcoin text-yellow-400 fa-2x"></i>
                    <span>18jZo8m4r6mSyozJb2MfQrH9TG24kPQY4i</span>
                </div>
                <span>My Features: Javascript, Typescript, Python, Nuxt-Vue, React, C/C++, Tailwind, Go, Java</span>
            </div>
        </div>
    </div>
</template>