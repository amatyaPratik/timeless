const collectionsOverlay = document.getElementById("songs-collection-overlay");
const collectionsToggle = document.getElementById("btn-playlists-n-songs");

function toggleCollectionsOverlay() {
  // collectionsToggle.focus();
  console.log("toggling");
  if (collectionsOverlay.style.display == "none") {
    collectionsOverlay.style.display = "block";
  } else {
    collectionsOverlay.style.display = "none";
  }
}

// collectionsToggle.addEventListener("click", toggleCollectionsOverlay);
// collectionsToggle.onmouseenter = ()=>{ toggleCollectionsOverlay.focus()}
collectionsToggle.onclick = toggleCollectionsOverlay;
