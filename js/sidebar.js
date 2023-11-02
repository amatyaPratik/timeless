const btnSongsFolder = document.getElementById("btn-songs-folder");
const btnBubble = document.querySelector('#bubbles.fx-btn')
const btnVisualizer = document.querySelector('#btn-visualizer.btn-visualizer')
const visualizerCanvas = document.querySelector('canvas#visualizer')

isBubbling = false


function toggleBubbles(){
  if(isBubbling){
    endBubbles()
    isBubbling = false
    btnBubble.style.backgroundImage = "url(./res/images/icons/sidebar/bubble.png)"
    btnBubble.classList.remove('on')
    btnBubble.classList.add('off')
  }
  else{
    startBubbles()
    isBubbling = true
    btnBubble.style.backgroundImage = "url(./res/images/icons/sidebar/bubble-outline.png)"
    btnBubble.classList.add('on')
    btnBubble.classList.remove('off')
  }
}

btnBubble.addEventListener('click',e=>{
  toggleBubbles()
})

btnSongsFolder.addEventListener("click", () => {
  btnSongsFolder.classList.add("active");
  //   location.replace("./songs.html");
});


btnVisualizer.addEventListener('click',()=>{
  toggleVisualizer()
})
