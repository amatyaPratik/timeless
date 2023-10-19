const btnSongsFolder = document.getElementById("btn-songs-folder");
const btnBubble = document.querySelector('#bubbles.fx-btn')


btnBubble.addEventListener('click',e=>{
  startBubbles()
})

btnSongsFolder.addEventListener("click", () => {
  btnSongsFolder.classList.add("active");
  //   location.replace("./songs.html");
});
