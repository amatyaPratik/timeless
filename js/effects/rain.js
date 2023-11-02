const videoContainer = document.getElementById('video-container')
const rainBtn = document.querySelector('#rain.sfx-btn')

const rainSound = document.createElement('audio')
rainSound.volume = 0.3
rainSound.loop = true
rainSound.src = "../res/sounds/rain.mp3";
rainSound.load()

isRaining = false

function toggleRain(){
    if(isRaining){
        rainBtn.classList.remove('on')
        rainBtn.classList.add('off')
        rainBtn.style.backgroundImage = "url(./res/images/icons/sidebar/rain-0.svg)"
        turnOffRain()
    }
    else{
        rainBtn.classList.add('on')
        rainBtn.classList.remove('off')
        rainBtn.style.backgroundImage = "url(./res/images/icons/sidebar/rain-1.svg)"
        turnOnRain()
    }
}

function turnOnRain(){
    rainSound.play()
    isRaining = true
    videoContainer.classList.add('show')
    videoContainer.classList.remove('hide')

}
  
function turnOffRain(){
    rainSound.pause()
    isRaining = false
    videoContainer.classList.remove('show')
    videoContainer.classList.add('hide')

}
