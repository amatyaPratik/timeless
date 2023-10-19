const controls = document.getElementsByClassName("previousplaynext")[0];

const pauseBtn = document.createElement("button");
const playBtn = document.getElementById('play')

const wheelLeft = document.getElementById('wheel-left')
const wheelRight = document.getElementById('wheel-right')

const videoContainer = document.getElementById('video-container')

const rainSound = document.createElement('audio')
rainSound.volume = '.3'
rainSound.src = "../res/sounds/rain.mp3";
rainSound.load()


pauseBtn.id = "pause";
pauseBtn.className = "pause circle";
pauseBtn.style.position = "absolute";
pauseBtn.style.cursor = "pointer";
pauseBtn.style.backgroundImage = "url(../res/images/icons/pause.png)";
controls.appendChild(pauseBtn);

playBtn.addEventListener("click", () => {
    player.play()
    wheelLeft.classList.remove("paused");
    wheelLeft.classList.add("running");
    wheelRight.classList.remove("paused");
    wheelRight.classList.add("running");
});

function turnOnRain(){
  videoContainer.classList.add('show')
  videoContainer.classList.remove('hide')
  rainSound.play()
}

function turnOffRain(){
  videoContainer.classList.remove('show')
  videoContainer.classList.add('hide')
  rainSound.pause()
}

controls.addEventListener('mousedown',e=>{
  if(e.target.tagName==='BUTTON'){
    new Audio('../res/sounds/click6.wav').play()
  }
})

pauseBtn.addEventListener('click',(e)=>{
    player.pause()
    wheelLeft.classList.remove("running");
    wheelLeft.classList.add("paused");
    wheelRight.classList.remove("running");
    wheelRight.classList.add("paused");
})