const albumOverlay = document.getElementById("album-overlay");
const firstAlbumCard = document.getElementsByClassName("albums-card")[0];

function toggleAlbumOverlay() {
  if (albumOverlay.style.display == "none") {
    albumOverlay.style.display = "block";
  } else {
    albumOverlay.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  if (albumOverlay.contains(e.target)) return;
  if (albumOverlay.classList.contains('show') && !albumOverlay.contains(e.target)){
    albumOverlay.classList.remove('show');
    return
  }
  if (!albumOverlay.classList.contains('show') && firstAlbumCard.contains(e.target)) {
    albumOverlay.classList.add('show')
  }
  // else{
  //   albumOverlay.classList.remove('show')
  // }
});
