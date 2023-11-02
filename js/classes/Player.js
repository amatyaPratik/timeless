class Player {

  context;
  modes = new Set('dj','casette','photos')
  mode

  constructor(songs) {
    // this.context = new AudioContext();

    this.chosenScheme = "serial";
    this.songs = songs;
    this.songIndex = 1;
    this.title = document.getElementById("title");
    this.artist = document.getElementById("artist");
    this.isFavoriteSong = false

    this.progressContainer = document.getElementsByClassName("progress-n-favorite")[0];
  
    this.inputProgress = this.progressContainer.getElementsByTagName("input")[0];
    this.hint = document.getElementById("timeHint");
    this.progressTime = document.getElementById("progress-time");
    this.endTime = document.getElementById("end-time");

    this.initAudio();
    this.source = this.context.createMediaElementSource(this.audio)

    this.locked = false;
    this.muted = false;
    this.isPlaying = !this.audio.paused;
    this.volume = this.audio.volume;
    this.previous_volume = this.volume;

    this.system = document.getElementById("timeless");

    this.volumeContainer = document.getElementById("volume-container");
    this.volumeHollow = document.getElementById("volume");
    this.volumeFilled = document.getElementById("set");
    this.btnVolume = document.getElementById("btn-volume");

    this.collectionsOverlay = document.getElementById("songs-collection-overlay");

    this.previousplaynext = document.getElementsByClassName("previousplaynext")[0];
    this.playBtn = document.getElementById("play");
    this.nextBtn = document.getElementById("next");
    this.previousBtn = document.getElementById("previous");

    this.btnSwitchScheme = document.getElementById("switch-schemes");
    this.btnPlaylistsToggle = document.getElementById('btn-playlists-n-songs')
    this.chooseScheme = document.getElementById("chooseScheme");
    this.btnSerial = document.getElementById("serial");
    this.btnShuffle = document.getElementById("shuffle");
    this.btnRepeat = document.getElementById("repeat");

    this.lockBtn = document.getElementById("lock");
    this.btnFavorite = document.getElementsByClassName("btn-favorite")[0];

    this.bass = document.querySelector("input#bass");
    this.mid = document.querySelector("input#mid");
    this.treble = document.querySelector("input#treble");
    this.reverb = document.querySelector("input#reverb");

    this.playBtn.addEventListener("click", () => {
      this.playpause();
      if(document.body.classList.contains('carousel')||document.body.classList.contains('classic')){
        switch (this.isPlaying) {
          case true:
            this.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
            this.playBtn.style.border = '3px solid var(--primary-color-x)';
            break;
          default:
            this.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
            this.playBtn.style.border = 'initial'
            break;
        }
      }
    });

    this.btnFavorite.addEventListener('click',()=>{
      this.addToFavorites();
    })

    this.analyserNode = this.context.createAnalyser();
    this.gainNode = new GainNode(this.context, {gain: this.audio.volume}) 
    this.bassEQ = new BiquadFilterNode(this.context,{
      type: 'lowshelf',
      frequency: 500,
      gain: this.bass.value
    })
    this.midEQ = new BiquadFilterNode(this.context,{
      type: 'peaking',
      Q: Math.SQRT1_2,
      frequency: 1500,
      gain: this.mid.value
    })
    this.trebleEQ = new BiquadFilterNode(this.context,{
      type: 'highshelf',
      frequency: 3000,
      gain: this.treble.value
    })

    this.setupEqualizerEventListeners()

    this.lockBtn.addEventListener("click", this.toggleLock);
    this.initDjMode();
    this.nextBtn.addEventListener("click", this.nextSong);
    this.previousBtn.addEventListener("click", this.previousSong);
    this.progressContainer.addEventListener('change',e=>{
      this.skipTo(e.target.value)
    })
    
    this.btnSwitchScheme.addEventListener("click", (e) => {
      const bodyThemes = document.getElementsByTagName('body')[0].classList
      //console.log('bodyThemes: ',bodyThemes);
      if(bodyThemes.contains('casette') || bodyThemes.contains('dj')){
        if (this.chooseScheme.classList.contains("on")) {
          switch (e.target.id) {
            case "serial":
              this.chosenScheme = "serial";
              this.btnSerial.style.zIndex = 97;
              show(this.btnSerial);
              this.btnShuffle.style.zIndex = 96;
              hide(this.btnShuffle);
              this.btnRepeat.style.zIndex = 96;
              hide(this.btnRepeat);
              break;
            case "shuffle":
              this.chosenScheme = "shuffle";
              this.btnSerial.style.zIndex = 96;
              hide(this.btnSerial);
              this.btnShuffle.style.zIndex = 97;
              show(this.btnShuffle);
              this.btnRepeat.style.zIndex = 96;
              hide(this.btnRepeat);
              break;
            case "repeat":
              this.chosenScheme = "repeat";
              this.btnSerial.style.zIndex = 96;
              hide(this.btnSerial);
              this.btnShuffle.style.zIndex = 96;
              hide(this.btnShuffle);
              this.btnRepeat.style.zIndex = 97;
              show(this.btnRepeat);
              break;
            default:
              this.btnSerial.id !== this.chosenScheme && hide(this.btnSerial);
              this.btnShuffle.id !== this.chosenScheme && hide(this.btnShuffle);
              this.btnRepeat.id !== this.chosenScheme && hide(this.btnRepeat);
          }
        }
        this.toggleSchemeButtons();
      }
      else if(bodyThemes.contains('carousel')||bodyThemes.contains('classic')){
        switch (this.chosenScheme){
          case 'serial':
            this.chosenScheme = 'shuffle'
            //console.log(this.chosenScheme);
            this.btnShuffle.style.zIndex = 97;
            show(this.btnShuffle);
            this.btnSerial.style.zIndex = 96;
            hide(this.btnSerial);
            this.btnRepeat.style.zIndex = 96;
            hide(this.btnRepeat);
            break;
          case 'shuffle':
            this.chosenScheme = 'repeat'
            //console.log(this.chosenScheme);
            this.btnRepeat.style.zIndex = 97;
            show(this.btnRepeat);
            this.btnSerial.style.zIndex = 96;
            hide(this.btnSerial);
            this.btnShuffle.style.zIndex = 96;
            hide(this.btnShuffle);
            break;
          case 'repeat':
            this.chosenScheme = 'serial'
            //console.log(this.chosenScheme);
            this.btnSerial.style.zIndex = 97;
            show(this.btnSerial);
            this.btnShuffle.style.zIndex = 96;
            hide(this.btnShuffle);
            this.btnRepeat.style.zIndex = 96;
            hide(this.btnRepeat);
            break;
          default:
        }
      }
    });

    this.btnVolume.addEventListener("mouseenter", () => {
      this.volumeContainer.style.display = "block";
    });
    this.btnVolume.addEventListener("click", () => {
      if (!this.muted) {
        this.mute();
      } else {
        this.unmute();
      }
    });

    this.volumeHollow.addEventListener("mousedown", (e) => {
      let totalHeight = getHeightFromBottom(this.volumeHollow, e.clientY);
      let newHeight = Math.floor(totalHeight);
      this.volumeFilled.style.height = newHeight + "px";
      this.volume = Math.abs(
        newHeight / getBoundary(this.volumeHollow).height
      ).toFixed(2);
      this.previous_volume = this.volume;
      //console.log(this.volume);
      this.setVolume(this.volume>1?1:this.volume);
    });

    this.system.addEventListener("click", (e) => {
      if (
        e.target.id != "volume-container" &&
        e.target.id != "volume" &&
        e.target.id != "set" &&
        this.volumeContainer.style.display != "none"
      ) {
        this.volumeContainer.style.display = "none";
      }
    });

    this.system.addEventListener("wheel", (e) => {
      if (collectionsOverlay.contains(e.target)) return;
      this.volumeContainer.style.display = "block";
      let dy;

      if (e.target.id != "sidebar") {
        if (
          getBoundary(this.volumeFilled).height >=
            getBoundary(this.volumeHollow).height &&
          e.deltaY < 0
        ) {
          dy = 0;
          this.volumeFilled.style.height = "100%";
        } else if (
          this.volumeFilled.style.height.split("px")[0] <= 0 &&
          e.deltaY > 0
        ) {
          dy = 0;
          this.volumeFilled.style.height = "0%";
        } else {
          dy = Math.ceil(e.deltaY * -0.01) * 10;
        }

        let volumeFilledHeight = getBoundary(this.volumeFilled).height;
        this.volumeFilled.style.height = volumeFilledHeight + dy + "px";

        this.volume = Math.abs(
          (volumeFilledHeight + dy) / getBoundary(this.volumeHollow).height
        ).toFixed(2);

        this.previous_volume = this.volume;

        this.setVolume(this.volume>1?1:this.volume)
      }
    });
  }

  getVolume = () => {
    return this.audio.volume;
  };
  setVolume = (newVolume) => {
    if(this.muted) return
    this.audio.volume = newVolume;
    if(newVolume<=0.02 && !this.muted)
    {
      this.mute()
      return
    }
    if(newVolume>0 && this.muted)
    {
      this.unmute()
    }
  };
  
  getDuration = () => {
    return {
      current: this.audio.currentTime,
      total: this.audio.duration,
    };
  };

  setupContext = () => {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    if (this.context.state === "suspended") {
      this.context.resume();
    }
  };

  mute = () => {
    this.muted = true;
    this.volumeContainer.style.display = "none";
    this.system.classList.replace("unmuted", "muted");
    this.btnVolume.style.backgroundImage = "url(timeless/res/images/icons/mute.png)";
    this.audio.volume = 0;
  };

  unmute = () => {
    this.muted = false;
    this.volumeContainer.style.display = "block";
    this.system.classList.replace("muted", "unmuted");
    this.btnVolume.style.backgroundImage = "url(timeless/res/images/icons/volume.png)";
    this.audio.volume = this.previous_volume;
  };

  updatePlayingSongInfo = () => {
    this.title.textContent = this.songs[this.songIndex].split("-")[1];
    this.artist.textContent = this.songs[this.songIndex].split("-")[0];
    this.endTime.textContent = getTimeInMmSs(this.audio.duration*1000)
  };

  
  play = () =>{
    this.audio.play();
    this.isPlaying = true
  }

  pause = () =>{
    this.audio.pause();
    this.isPlaying = false
  }

  playpause = () => {
    if (this.audio.paused) {
      this.audio.play();
    } else this.audio.pause();

    this.isPlaying = !this.audio.paused;
  };

  nextSong = () => {
    switch (this.chosenScheme) {
      case "serial":
        this.songIndex = (this.songIndex + 1) % this.songs.length;
        break;
      case "shuffle":
        this.songIndex = getRandomInt(0, this.songs.length);
        break;
      case "repeat":
    }
    this.audio.src = "timeless/songs/" + this.songs[this.songIndex] + ".mp3";
    this.audio.load()   
    this.audio.pause();
    this.playpause();
    this.updatePlayingSongInfo();
  };

  previousSong = () => {
    switch (this.chosenScheme) {
      case "serial":
        this.songIndex =
          (this.songIndex - 1 + this.songs.length) % this.songs.length;
        break;
      case "shuffle":
        this.songIndex = getRandomInt(0, this.songs.length);
        break;
      case "repeat":
    }
    this.audio.src = "timeless/songs/" + this.songs[this.songIndex] + ".mp3";   
    this.playpause();
    this.updatePlayingSongInfo();
  };

  playTitle = (title) => {
    let idx = this.songs.findIndex((song) =>
      song.toLowerCase().includes(title.trim().toLowerCase())
    );

    this.songIndex = idx;
    this.audio.src = "timeless/songs/" + this.songs[this.songIndex] + ".mp3";
    // this.audio.load()
    this.play();
    this.updatePlayingSongInfo(title);
  };

  skipTo = (seekPercent) => {
    if (this.locked) return;

    const selectedPoint = Math.floor(
      (seekPercent / 100) * this.getDuration().total
    );

    this.audio.currentTime = selectedPoint;
    this.inputProgress.value = seekPercent;
  };

  updateProgressInUI = (timeupdateEvent) => {
    const { duration, currentTime } = timeupdateEvent.srcElement;
    const progressedPercent = (currentTime / duration) * 100;
    this.inputProgress.value = progressedPercent;
    this.progressTime.textContent = getTimeInMmSs(currentTime*1000)
  };

  initAudio = () => {
    if (!this.audio) {
      this.setupContext();
      this.audio = document.createElement("audio");
      this.audio.id = "audio";
      this.audio.src = "timeless/songs/" + this.songs[this.songIndex] + ".mp3";
      this.audio.load()
      this.audio.volume = 0.0;
      this.audio.play();
      this.title.textContent = this.songs[this.songIndex].split("-")[1];
      this.artist.textContent = this.songs[this.songIndex].split("-")[0];
      
      // this.audio.addEventListener('canplay',this.setupAudioAsEqualizerSource)
      this.audio.addEventListener("timeupdate", this.updateProgressInUI);
      this.audio.addEventListener("ended", this.nextSong);
      this.audio.addEventListener('loadedmetadata', (function(e) {
        // Now you can access this.audio.duration safely
        this.endTime.textContent = getTimeInMmSs(this.audio.duration*1000)
      }).bind(this));
    }
  };

  getAudio(){
    return this.audio
  }

  toggleSchemeButtons = () => {
      if (!this.chooseScheme.classList.contains("on")) {
        this.chooseScheme.classList.add("on");
        this.btnSerial.style.transform = "translateX(50px)";
        this.btnShuffle.style.transform = "translateY(50px)";
        this.btnRepeat.style.transform = "translateY(-50px)";
        show(this.btnSerial);
        show(this.btnShuffle);
        show(this.btnRepeat);
      } else {
        this.chooseScheme.classList.remove("on");
        this.btnSerial.style.transform = "translateX(0px)";
        this.btnShuffle.style.transform = "translateY(0px)";
        this.btnRepeat.style.transform = "translateX(0px)";
      }
  };

  addToFavorites = () => {
    this.isFavoriteSong = !this.isFavoriteSong
    this.btnFavorite.style.backgroundImage= this.isFavoriteSong? "url('timeless/res/images/sprites/favorite.png')":"url('timeless/res/images/icons/favorite-btn.png')"
  }

  initDjMode = () => {
    this.mode= this.modes.has('dj')&&'dj'
    if (!this.system.classList.contains("dj")) return;

    this.disk = document.getElementById("vinyl-container");

    this.playBtn.addEventListener("click", () => {
      this.disk.style.animationPlayState =
        (this.isPlaying && "running") || (!this.isPlaying && "paused");

              switch (this.isPlaying) {
          case true:
            this.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
            this.playBtn.style.border = '3px solid var(--primary-color-x)';
            break;
          default:
            this.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
            this.playBtn.style.border = 'initial'
            break;
        }
    });
  };

  toggleLock = () => {
    this.locked = !this.locked;
    if (this.locked) {
      document.body.classList.add('locked')
      this.previousBtn.style.display = "none";
      this.playBtn.style.display = "none";
      this.nextBtn.style.display = "none";
      this.inputProgress.disabled = true;
      this.lockBtn.title = 'unlock player'
      this.btnFavorite.style.opacity = .4
      this.btnFavorite.style.pointerEvents = 'none'
      this.inputProgress.style.opacity = .2
      this.btnSwitchScheme.style.opacity = .2
      this.btnSwitchScheme.style.pointerEvents = 'none'
      this.btnPlaylistsToggle.style.display = 'none'
      this.btnVolume.style.display = 'none'
    } else {
      document.body.classList.remove('locked')
      this.previousBtn.style.display = "initial";
      this.playBtn.style.display = "initial";
      this.nextBtn.style.display = "initial";
      this.inputProgress.disabled = false;
      this.btnFavorite.style.opacity = 1
      this.btnFavorite.style.pointerEvents = 'initial'
      this.inputProgress.style.opacity = 1
      this.btnSwitchScheme.style.opacity = 1
      this.btnSwitchScheme.style.pointerEvents = 'initial'
      this.lockBtn.title = 'lock player'
      this.btnPlaylistsToggle.style.display = 'initial'
      this.btnVolume.style.display = 'initial'
    }
  };

  setupEqualizerEventListeners(){
    this.audio.addEventListener('volumechange',e=>{
      const value = this.audio.volume
      //console.log('value: ',value);
      this.gainNode.gain.setTargetAtTime(value, this.context.currentTime, 0.01)
    })
    this.bass.addEventListener('input',e=>{
      const value = e.target.value
      //console.log('bass: ',value);
      this.gainNode.gain.setTargetAtTime(value, this.context.currentTime, 0.01)
    })
    mid.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      //console.log('mid: ',value);
      this.midEQ.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    });
  
    treble.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      //console.log('treb: ',value);
      this.trebleEQ.gain.setTargetAtTime(value, this.context.currentTime, 0.01);
    });
  }
}
