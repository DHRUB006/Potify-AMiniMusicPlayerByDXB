new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Humsafar",
          artist: "Akhil Sachdeva",
          cover: "https://iili.io/HrItvXn.jpg",
          source: "https://audio.jukehost.co.uk/g0RqCiEKt29Mnngc5r3PZXZnAd9h8kwT",
          url: "https://youtu.be/8v-TWxPWIWc",
          favorited: false
        },
        {
          name: "Samjhawan",
          artist: "Arijit Singh, Shreya Ghoshal",
          cover: "https://iili.io/HrIbLiu.jpg",
          source: "https://audio.jukehost.co.uk/6bOfRlXp4qJOfBnj3V44sYCf0zAO2T5Z",
          url: "https://youtu.be/wO5j3lv_9Fs",
          favorited: true
        },

        {
          name: "Jeena Jeena",
          artist: "Atif Aslam",
          cover: "https://iili.io/HrIyco7.jpg",
          source: "https://audio.jukehost.co.uk/HwmevC6W4XjhCbarDZK2UpTjHiHwxDC5",
          url: "https://youtu.be/3u1c0e2S6HM",
          favorited: false
        },

        {
          name: "Scars to Your Beautiful",
          artist: "Alessia Cara",
          cover: "https://iili.io/HrT9kI2.jpg",
          source: "https://audio.jukehost.co.uk/66iGMvvnSMiwZ2xA6V3zOZ7H2cuQ6bLC",
          url: "https://www.youtube.com/watch?v=MWASeaYuHZo",
          favorited: false
        },
        {
          name: "Unstoppable",
          artist: "Sia",
          cover: "https://iili.io/HrTHLas.jpg",
          source: "https://audio.jukehost.co.uk/2ktgpYpQY9UgiyNHRffocLn7yRoFzRWy",
          url: "https://www.youtube.com/watch?v=YaEG2aWJnZ8",
          favorited: true
        },
        {
          name: "Pyar Ho",
          artist: "Sunidhi Chauhan",
          cover: "https://iili.io/HrT35Ab.jpg",
          source: "https://audio.jukehost.co.uk/MkNCcIlD8wUFrKxXTnrbqvq6jvoogo4N",
          url: "https://www.youtube.com/watch?v=PCV10fMeTDU",
          favorited: false
        },
        {
          name: "Moh Moh Ke Dhaage",
          artist: "Monali Thakur",
          cover: "https://iili.io/HrTFJzx.jpg",
          source: "https://audio.jukehost.co.uk/XyfPeV4E5NOQCMBWKADJPNfGhcBUua5M",
          url: "https://www.youtube.com/watch?v=peBsfgbOlYM",
          favorited: true
        },
        {
          name: "Tere Hawaale",
          artist: "Arijit Singh, Shilpa Rao",
          cover: "https://iili.io/HrTBo3N.jpg",
          source: "https://audio.jukehost.co.uk/Z30neb63UUrMM7yE3DoTYZu2NjFUtKNJ",
          url: "https://www.youtube.com/watch?v=KUpwupYj_tY",
          favorited: false
        },
        {
          name: "Dil",
          artist: "Raghav Chaitanya",
          cover: "https://iili.io/HrTosKx.jpg",
          source: "https://audio.jukehost.co.uk/4VIblqYJVoFKEzAxWzJFFoe5FQRANFTe",
          url: "https://www.youtube.com/watch?v=vK14NhODTuE",
          favorited: false
        },
        {
          name: "Choo Lo",
          artist: "The Local Train",
          cover: "https://iili.io/HiTDZue.jpg",
          source: "https://audio.jukehost.co.uk/OygAc4OD6bCkzolKKfOGX4tJT5RFmgzQ",
          url: "https://www.youtube.com/watch?v=sFMRqxCexDk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
