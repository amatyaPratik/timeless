const controls = document.getElementsByClassName("previousplaynext")[0];

const pauseBtn = document.createElement("button");
const playBtn = document.getElementById('play')

const wheelLeft = document.getElementById('wheel-left')
const wheelRight = document.getElementById('wheel-right')

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

controls.addEventListener('mouseup',e=>{
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