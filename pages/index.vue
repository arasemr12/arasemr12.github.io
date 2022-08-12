<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div v-if="json" class="w-full lg:w-2/3 h-full flex flex-col items-center justify-center">
      <div class="bg-red-600 w-full rounded-full p-4 top-0 mb-8 absolute opacity-0 transition duration-1000" id="msg">Discord username copied!</div>
      <div class="w-full">
        <img draggable="false" :src="'https://cdn.discordapp.com/avatars/'+json.data.discord_user.id+'/'+json.data.discord_user.avatar+'.gif'" class="rounded-full mx-auto mb-4 profile bg-gray-500 animate-pulse" @load="imgloaded('logo')" width="128" height="128" alt="My best logo." id="logo"/>
        <h1 class="text-4xl font-bold text-center mb-4">{{json.data.discord_user.username}}</h1>
        <p class="text-center">Hello, I'm arasemr12, I'm interested in coding. Technologies I use:</p>
        <div class="flex flex-row items-center justify-center flex-wrap mt-4" id="technologies">
          <div class="icon">
            <span class="text-xs rounded-full">Node.js</span>
            <i class="fab fa-node-js fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Python</span>
            <i class="fab fa-python fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Html5</span>
            <i class="fab fa-html5 fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Css3</span>
            <i class="fab fa-css3 fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Javascript</span>
            <i class="fab fa-js-square fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Bootstrap</span>
            <i class="fab fa-bootstrap fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Nuxt.js&Vue.js</span>
            <i class="fab fa-vuejs fa-2x z-20"></i>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">C/C++</span>
            <i class="fab fa-c fa-2x z-20"></i>
          </div>
        </div>
      </div>
      <span class="hr"></span>
      <div class="w-full">
        <h2 class="text-2xl font-bold text-center mb-4">Contact me</h2>
        <div class="flex flex-row items-center justify-center mt-4 flex-wrap">
          <div class="icon">
            <span class="text-xs rounded-full">Discord</span>
            <a id="discord" @click.prevent="dc()" class="cursor-pointer"><i class="fab fa-discord fa-2x z-20"></i></a>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Github</span>
            <a href="https://github.com/arasemr12" target="_blank"><i class="fab fa-github fa-2x z-20"></i></a>
          </div>
          <div class="icon">
            <span class="text-xs rounded-full">Twitter</span>
            <a href="https://twitter.com/arasemr1234" target="_blank"><i class="fab fa-twitter fa-2x z-20"></i></a>
          </div>
        </div>
      </div>
      <span class="hr"></span>
      <div class="w-full">
        <h2 class="text-2xl font-bold text-center mb-4 uppercase">CURRENTLY LISTENING</h2>
        <div class="flex flex-row justify-center mt-4 items-center">
          <div v-if="json.data.spotify" class="flex flex-col">
            <div class="w-full flex flex-row mb-2">
              <div class="mr-2">
                <img draggable="false" width="64" height="64" class="rounded-lg bg-gray-500" :src=json.data.spotify.album_art_url>
              </div>
              <div class="flex flex-col">
                <span>{{json.data.spotify.song}}</span>
                <span>{{json.data.spotify.artist}}</span>
                <span>{{json.data.spotify.album}}</span>
              </div>
            </div>
            <div class="w-full">
              <span class="progress">
                <span id="progress" :style="'width:'+json.data.spotify.played+'%'" class="progressin transition duration-500"></span>
              </span>
              <div class="flex justify-between">
                <span id="played">{{mstosec(json.data.spotify.diff)}}</span>
                <span id="total">{{mstosec(json.data.spotify.total)}}</span>
              </div>
            </div>
          </div>
          <div v-else>
            not listening
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full flex flex-col items-center justify-center" v-else>
      <span class="loading"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data:() => {
    return{
      json:null
    }
  },
  methods: {
    update: function(){
      fetch('https://api.lanyard.rest/v1/users/441221465019514881')
        .then((res) => res.json())
        .then((body) => {
          this.json = body;
          if(!body.data.spotify) return;
          let total = body.data.spotify.timestamps.end - body.data.spotify.timestamps.start;
          let diff = Date.now() - body.data.spotify.timestamps.start;
          this.json.data.spotify.total = total;
          this.json.data.spotify.diff = diff;
          this.json.data.spotify.played = diff / total * 100;
        });
    },
    mstosec:function(ms){
      let seconds = Math.floor(ms / 1000);
      let minutes = Math.floor(seconds / 60);
      seconds = seconds%60;
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    copy: function(text){
      if (!navigator.clipboard) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return document.execCommand('copy');
      };

      navigator.clipboard.writeText(text);
    },
    discord: function (e) {
      this.copy("arasemr12#9891");
      this.sendmsg("Discord username copied!");
    },
    sendmsg: function(msg) {
      let msge = document.getElementById('msg');
      msge.innerText = msg;
      msge.classList.add("opacity-100");
      setTimeout(() => {
        msge.classList.remove("opacity-100");
      }, 3000);
    },
    imgloaded: function(id) {
      let el = document.getElementById(id);
      el.classList.remove('animate-pulse');
    }
  },
  created(){
    setInterval(() => {
      this.update();
    }, 1000);
  },
};
</script>
