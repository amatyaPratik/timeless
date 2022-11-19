class Player {
  constructor(songs) {
    this.context = new AudioContext();

    this.chosenScheme = "serial";
    this.songs = songs;
    this.songIndex = 1;
    this.title = document.getElementById("title");
    this.artist = document.getElementById("artist");

    //progress UI
    this.progressContainer = document.getElementsByClassName(
      "progress-n-favorite"
    )[0];
    // this.progress =
    //   this.progressContainer.getElementsByClassName("progress")[0];
    // this.progressHandle = document.getElementsByClassName("progress-handle")[0];

    this.inputProgress =
      this.progressContainer.getElementsByTagName("input")[0];
    this.hint = document.getElementById("timeHint");
    this.progressTime = document.getElementById("progress-time");
    this.endTime = document.getElementById("end-time");

    this.initAudio();

    this.locked = false;
    this.muted = false;
    this.playing = false;
    this.volume = this.audio.volume;
    this.previous_volume = this.volume;

    this.system = document.getElementById("timeless");

    this.volumeContainer = document.getElementById("volume-container");
    this.volumeHollow = document.getElementById("volume");
    this.volumeFilled = document.getElementById("set");
    this.btnVolume = document.getElementById("btn-volume");

    this.collectionsOverlay = document.getElementById(
      "songs-collection-overlay"
    );

    this.previousplaynext =
      document.getElementsByClassName("previousplaynext")[0];
    this.playBtn = document.getElementById("play");
    this.nextBtn = document.getElementById("next");
    this.previousBtn = document.getElementById("previous");

    this.btnSwitchScheme = document.getElementById("switch-schemes");
    this.chooseScheme = document.getElementById("chooseScheme");
    this.btnSerial = document.getElementById("serial");
    this.btnShuffle = document.getElementById("shuffle");
    this.btnRepeat = document.getElementById("repeat");

    this.lockBtn = document.getElementById("lock");
    this.favoriteBtn = document.getElementsByClassName("btn-favorite")[0];

    this.playBtn.addEventListener("click", () => {
      this.playpause();
    });

    this.lockBtn.addEventListener("click", this.toggleLock);
    this.initDjMode();
    this.nextBtn.addEventListener("click", this.nextSong);
    this.previousBtn.addEventListener("click", this.previousSong);

    this.btnSwitchScheme.addEventListener("click", (e) => {
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
      let totalHeight = e.clientY;
      let newHeight = Math.floor(
        getBoundary(this.volumeHollow).height - totalHeight
      );
      this.volumeFilled.style.height = newHeight + "px";
      this.volume = Math.abs(
        newHeight / getBoundary(this.volumeHollow).height
      ).toFixed(2);
      this.previous_volume = this.volume;
      this.setVolume(this.volume);
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

        this.setVolume(this.volume);
      }
    });
  }

  getVolume = () => {
    return this.audio.volume;
  };
  setVolume = (newVolume) => {
    this.audio.volume = newVolume;
  };
  getDuration = () => {
    return {
      current: this.audio.currentTime,
      total: this.audio.duration,
    };
  };

  setupContext = () => {
    if (this.context.state === "suspended") {
      this.context.resume();
    }
  };

  mute = () => {
    this.muted = true;
    this.volumeContainer.style.display = "none";
    this.system.classList.replace("unmuted", "muted");
    this.btnVolume.style.backgroundImage = "url(../res/images/icons/mute.png)";
    this.audio.volume = 0;
  };

  unmute = () => {
    this.muted = false;
    this.volumeContainer.style.display = "block";
    this.system.classList.replace("muted", "unmuted");
    this.btnVolume.style.backgroundImage =
      "url(../res/images/icons/volume.png)";
    this.audio.volume = this.previous_volume;
  };

  updatePlayingSongInfo = () => {
    this.title.textContent = this.songs[this.songIndex].split("-")[1];
    this.artist.textContent = this.songs[this.songIndex].split("-")[0];
  };

  playpause = () => {
    if (this.audio.paused) {
      this.audio.play();
    } else this.audio.pause();

    this.playing = this.audio.paused;
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
    this.audio.src = "../songs/" + this.songs[this.songIndex] + ".mp3";
    this.updatePlayingSongInfo();
    this.audio.pause();
    this.playpause();
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
    this.audio.src = "../songs/" + this.songs[this.songIndex] + ".mp3";
    this.updatePlayingSongInfo();
    this.playpause();
  };

  playTitle = (title) => {
    let idx = this.songs.findIndex((song) =>
      song.toLowerCase().includes(title.toLowerCase())
    );

    this.songIndex = idx;
    this.audio.src = "../songs/" + this.songs[this.songIndex] + ".mp3";
    this.audio.pause();
    this.playpause();
    this.updatePlayingSongInfo(title);
  };

  setCurrentTime = (newCurrentTime) => {
    this.audio.currentTime = newCurrentTime;
  };
  skipTo = (seekPercent) => {
    if (this.locked) return;

    const selectedPoint = Math.floor(
      (seekPercent / 100) * this.getDuration().total
    );

    this.audio.currentTime = selectedPoint;
    this.inputProgress.value = seekPercent;
  };

  updateProgressThumb = (timeupdateEvent) => {
    const { duration, currentTime } = timeupdateEvent.srcElement;
    const progressedPercent = (currentTime / duration) * 100;
    this.inputProgress.value = progressedPercent;
  };

  initAudio = () => {
    if (!this.audio) {
      this.audio = document.createElement("audio");
      this.audio.id = "audio";
      this.audio.src = "../songs/" + this.songs[this.songIndex] + ".mp3";
      this.audio.volume = 0.2;
      // this.audio.currentTime = 0;
      this.title.textContent = this.songs[this.songIndex].split("-")[1];
      this.artist.textContent = this.songs[this.songIndex].split("-")[0];
      this.setupContext();
      this.audio.play();

      this.audio.addEventListener("timeupdate", this.updateProgressThumb);
      this.audio.addEventListener("ended", this.nextSong);
    }
    // this.initProgressUI(0, this.audio.duration);
  };

  // initProgressUI = (min, max) => {
  //   this.inputProgress.setAttribute("min", min);
  //   this.inputProgress.setAttribute("max", max);
  // };

  toggleSchemeButtons = () => {
    if (!this.chooseScheme.classList.contains("on")) {
      this.chooseScheme.classList.add("on");
      this.btnSerial.style.transform = "translateX(-80px)";
      this.btnShuffle.style.transform = "translateY(80px)";
      this.btnRepeat.style.transform = "translateX(80px)";
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

  initDjMode = () => {
    if (!this.system.classList.contains("dj")) return;

    this.disk = document.getElementById("vinyl-container");

    this.playBtn.addEventListener("click", () => {
      this.disk.style.animationPlayState =
        (this.playing && "running") || (!this.playing && "paused");

      this.playBtn.style.backgroundImage =
        (this.playing && "url('../res/images/icons/play.png')") ||
        this.playing ||
        "url('../res/images/icons/pause.png')";
    });
  };

  toggleLock = () => {
    this.locked = !this.locked;
    if (this.locked) {
      this.previousBtn.style.display = "none";
      this.playBtn.style.display = "none";
      this.nextBtn.style.display = "none";
      this.inputProgress.style.display = "none";
      this.favoriteBtn.style.display = "none";
      this.progressContainer.style.opacity = 0.2;
      this.lockBtn.style.backgroundImage =
        "url(../res/images/icons/locked.png)";
      // this.lockBtn.style.left = "90%";
    } else {
      this.previousBtn.style.display = "initial";
      this.playBtn.style.display = "initial";
      this.nextBtn.style.display = "initial";
      this.progressHandle.style.display = "initial";
      this.favoriteBtn.style.display = "initial";
      this.progressContainer.style.opacity = 1;
      // this.lockBtn.style.left = "0";
      this.lockBtn.style.backgroundImage =
        "url(../res/images/icons/unlocked.png)";
    }
  };
}
