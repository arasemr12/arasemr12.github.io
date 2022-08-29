<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PNZ9C6R1H4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-PNZ9C6R1H4');
    </script>
    <div v-if="json" class="w-full lg:w-2/3 min-h-full flex flex-col items-center justify-center">
      <div ref="msg" class="bg-green-100 text-green-600 w-full lg:w-2/3 rounded-full opacity-0 invisible duration-1000 py-2 px-2 absolute top-0">Discord username copied!</div>
      <div class="w-full">
        <img draggable="false" :src="'https://cdn.discordapp.com/avatars/'+json.data.discord_user.id+'/'+json.data.discord_user.avatar+'.gif'" class="rounded-full mx-auto mb-4 profile bg-gray-500 animate-pulse" @load="imgloaded('logo')" width="128" height="128" alt="My best logo." ref="logo"/>
        <h1 class="text-4xl font-bold text-center mb-4 flex flex-row items-center w-full justify-center">{{json.data.discord_user.username}}<span :class="`duration-500 w-6 h-6 ml-2 rounded-full ${colors[json.data.discord_status]} block`"></span></h1>
        <p class="text-center">Hello, I'm arasemr12, I'm interested in coding. Technologies I use:</p>
        <div class="flex flex-row items-center justify-center flex-wrap mt-4 gap-8" id="technologies">
          <icon title="Node.js" icon="fab fa-node-js"/>
          <icon title="Python" icon="fab fa-python"/>
          <icon title="Html5" icon="fab fa-html5"/>
          <icon title="Css3" icon="fab fa-css3"/>
          <icon title="Javascript" icon="fab fa-js-square"/>
          <icon title="Bootstrap" icon="fab fa-bootstrap"/>
          <icon title="Nuxt.js&Vue.js" icon="fab fa-vuejs"/>
          <icon title="C/C++" icon="fab fa-c"/>
        </div>
      </div>
      <span class="hr"></span>
      <div class="w-full">
        <h2 class="text-2xl font-bold text-center mb-4 uppercase">Contact me</h2>
        <div class="flex flex-row items-center justify-center mt-4 flex-wrap gap-10">
          <icon title="Discord" icon="fab fa-discord" type="btn" :callback="discord"/>
          <icon title="Github" icon="fab fa-github" url="https://github.com/arasemr12"/>
          <icon title="Twitter" icon="fab fa-twitter" url="https://twitter.com/arasemr1234"/>
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
      json:null,
      colors:{
        "dnd":"bg-red-600",
        "idle": "bg-yellow-600",
        "online": "bg-green-600",
        "offline": "bg-gray-600"
      }
    }
  },
  methods: {
    async update(){
      try {
        let res = await fetch('/api/@me');
        let json = await res.json();

        this.json = json;

        if(!json.data.spotify) return;

        let total = json.data.spotify.timestamps.end - json.data.spotify.timestamps.start;
        let diff = Date.now() - json.data.spotify.timestamps.start;

        this.json.data.spotify.total = total;
        this.json.data.spotify.diff = diff;
        this.json.data.spotify.played = diff / total * 100;
      } catch (error) {
        console.log(error);
      }
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
    async sendmsg(msg) {
      let el = await this.$refs.msg;

      el.innerText = msg;
      el.classList.add("opacity-100");
      el.classList.add("visible");
      el.classList.remove("opacity-0");
      el.classList.remove("invisible");

      setTimeout(() => {
        el.classList.remove("opacity-100");
        el.classList.remove("visible");
        el.classList.add("opacity-0");
        el.classList.add("invisible");
      }, 3000);
    },
    async imgloaded(ref) {
      let el = await this.$refs[ref];
      
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
