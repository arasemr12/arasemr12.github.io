<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="bg-red-600 w-full rounded-full p-4 top-0 mb-8 absolute opacity-0 transition duration-1000" id="msg">Discord username copied!</div>
    <div class="w-full lg:w-2/3 bg-gray-800 p-6 rounded-lg flex flex-col items-center mt-24 top-0 h-full">
      <div class="w-full">
        <img draggable="false" src="" class="rounded-full mx-auto mb-4 profile bg-gray-500 animate-pulse" @load="imgloaded('logo')" width="128" height="128" alt="" id="logo"/>
        <h1 class="text-4xl font-bold text-center mb-4" id="username">arasemr12</h1>
        <p class="text-center">Hello, I'm Emrah, I'm interested in coding. Technologies I use:</p>
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
          <div class="icon">
            <span class="text-xs rounded-full">Instagram</span>
            <a href="https://www.instagram.com/arasemr1234/" target="_blank"><i class="fab fa-instagram fa-2x z-20"></i></a>
          </div>
        </div>
      </div>
      <span class="hr"></span>
      <div class="w-full">
        <h2 class="text-2xl font-bold text-center mb-4 uppercase">CURRENTLY LISTENING</h2>
        <div class="flex flex-row justify-center mt-4 items-center">
          <div class="flex flex-col">
            <div class="w-full flex flex-row mb-2">
              <div class="mr-2">
                <img draggable="false" width="64" height="64" class="rounded-lg bg-gray-500" src="" id="spoimg">
              </div>
              <div class="flex flex-col">
                <span id="sposong"></span>
                <span id="spoartist"></span>
                <span id="spoalbum"></span>
              </div>
            </div>
            <div class="w-full">
              <span class="progress">
                <span id="progress" style="width:100%;" class="progressin transition duration-500"></span>
              </span>
              <div class="flex justify-between">
                <span id="played">1:00</span>
                <span id="total">2:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    dc: function (e) {
      if (!navigator.clipboard) {
        let textArea = document.createElement("textarea");
        textArea.value = "arasemr12#9891";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        return;
      }
      navigator.clipboard.writeText("arasemr12#9891").then(
        function () {
          
        },
        function (err) {
          console.error("Could not copy text: ", err);
        }
      );
      this.sendmsg("e","Discord username copied!");
    },
    sendmsg: function(e,msg) {
      let msge = document.getElementById('msg');
      msge.innerText = msg;
      //msge.style.display = "block";
      msge.classList.add("opacity-100");
      setTimeout(() => {
        //msge.style.display = "none";
        msge.classList.remove("opacity-100")
      }, 3000);
    },
    imgloaded: function(id) {
      let el = document.getElementById(id);
      el.classList.remove('animate-pulse');
    }
  },
  mounted() {
    let logo = document.getElementById('logo');
    let spoimg = document.getElementById('spoimg');
    let sposong = document.getElementById('sposong');
    let spoartist = document.getElementById('spoartist');
    let username = document.getElementById('username');
    let spoalbum = document.getElementById('spoalbum');
    let progress = document.getElementById('progress');
    let total = document.getElementById('total');
    let played = document.getElementById('played');
    function spo() {
     function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
     }

     fetch('https://api.lanyard.rest/v1/users/441221465019514881')
      .then((res) => res.json())
      .then((data) => {
        data = data.data;
        logo.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.gif`;
        username.innerText = data.discord_user.username;
        if(data.listening_to_spotify){
          let totalLength = data.spotify.timestamps.end - data.spotify.timestamps.start;
          let diff = Date.now() - data.spotify.timestamps.start;
          let playedPercentage = diff / totalLength * 100;
          spoimg.src = data.spotify.album_art_url;
          sposong.innerText = data.spotify.song;
          spoartist.innerText = data.spotify.artist;
          spoalbum.innerText = data.spotify.album;
          progress.style.width = playedPercentage + "%";
          played.innerText = millisToMinutesAndSeconds(diff);
          total.innerText = millisToMinutesAndSeconds(totalLength);
        }else{
          spoimg.src = logo.src;
          sposong.innerText = "Not listening";
          spoartist.innerText = data.discord_user.username+"#"+data.discord_user.discriminator;
          spoalbum.innerText = "";
        }
      });
    }
    setInterval(() => {
      spo();
    }, 1000);
  },
};
</script>
