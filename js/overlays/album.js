const albumOverlay = document.getElementById("album-overlay");
const albumToggle = document.getElementsByClassName("album-link")[0];

function toggleAlbumOverlay() {
  console.log("toggling");
  if (albumOverlay.style.display == "none") {
    albumOverlay.style.display = "block";
  } else {
    albumOverlay.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  if (albumOverlay.contains(e.target)) return;
  if (albumOverlay.style.display == "none" && !albumToggle.contains(e.target))
    return;
  if (albumOverlay.style.display == "none" && albumToggle.contains(e.target)) {
    albumOverlay.style.display = "block";
    return;
  } else {
    albumOverlay.style.display = "none";
  }
});
