const collectionsOverlay = document.getElementById("songs-collection-overlay");
const collectionsToggle = document.getElementById("btn-playlists-n-songs");

function toggleCollectionsOverlay() {
  // collectionsToggle.focus();
  //console.log("toggling");
  if (collectionsOverlay.style.display != "block") {
    collectionsOverlay.style.display = "block";
    collectionsToggle.classList.remove('closed')
    collectionsToggle.classList.add('opened')
  } else {
    collectionsOverlay.style.display = "none";
    collectionsToggle.classList.remove('opened')
    collectionsToggle.classList.add('closed')
  }
}

// collectionsToggle.addEventListener("click", toggleCollectionsOverlay);
// collectionsToggle.onmouseenter = ()=>{ toggleCollectionsOverlay.focus()}
collectionsToggle.onclick = toggleCollectionsOverlay;
