<template>
  <div v-if="data" class="w-full h-full flex flex-col items-center">
    <nav class="flex flex-row items-center gap-5 p-4 z-50">
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/">Skills</nuxt-link>
    </nav>
    <div class="w-full lg:w-2/3 h-full text-white flex flex-col items-center text-center py-12 gap-5 z-50">
      <img :src="`${data.discord_user.avatar ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${data.discord_user.discriminator.charAt(3)}.png`}`" draggable="false" class="rounded-full" width="128" alt="">
      <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">arasemr12</h1>
      <div class="flex flex-col w-full items-center">
        <span>{{ data.activities.find((e) => e.type == 4).state.replace("arasemr12.tk - ","") }}</span>
        <span class="text-xs">arasemr1234@protonmail.com</span>
      </div>
      <span class="hr"/>
      <button @click="this.$refs.video.muted = !this.$refs.video.muted">Open sound</button>
      <div class="flex flex-col items-center gap-1 min-w-[20%]" v-if="data.listening_to_spotify">
        <div class="flex flex-row items-center space-x-2 w-full justify-between">
          <img draggable="false" :src="data.spotify.album_art_url" class="rounded-lg" width="64" alt="">
          <div class="flex flex-col items-start w-full">
            <span>{{ data.spotify.song }}</span>
            <span>{{ data.spotify.artist }}</span>
            <span>{{ data.spotify.album }}</span>
          </div>
        </div>
        <div class="w-full">
          <span class="w-full block bg-gray-400 h-1 rounded-full">
            <span class="bg-gray-100 h-1 block rounded-full duration-300" :style="`width: ${((Date.now() - data.spotify.timestamps.start) / (data.spotify.timestamps.end - data.spotify.timestamps.start)) * 100}%;`"></span>
          </span>
        </div>
        <div class="w-full flex flex-row items-center justify-between">
          <span>{{ timestamps.start }}</span>
          <span>{{ timestamps.end }}</span>
        </div>
      </div>
    </div>
    <div class="absolute top-0 bottom-0 w-full h-full overflow-hidden">
      <video ref="video" class="min-w-full min-h-full w-auto h-auto absolute top-1/2 left-1/2 object-cover blur-md" style="transform: translate(-50%,-50%);" autoplay muted loop>
        <source src="./parkour.mp4" type="video/mp4">
      </video>
    </div>
  </div>
  <div v-else>
    loading..
  </div>
</template>

<script>
export default {
  name:"app",
  data:() => {
    return{
      data:null,
      timestamps:{
        start:"0:00",
        end:"0:00"
      }
    }
  },
  mounted(){
    document.addEventListener('contextmenu',(e) => {
      e.preventDefault();
    })
  },
  methods:{
    async update(){
      let res = await useFetch("/api/user");
      this.data = res.data.value.user;
      this.timestamps.start = this.ms(Date.now() - this.data.spotify.timestamps.start);
      this.timestamps.end = this.ms(this.data.spotify.timestamps.end - this.data.spotify.timestamps.start);
    },
    ms(mss){
      let seconds = Math.floor(mss / 1000);
      let minutes = Math.floor(seconds / 60);
      seconds = seconds%60;
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  },
  created(){
    this.update();
    setInterval(this.update, 1000);
  }
}
</script>