const artistOverlay = document.getElementById("artist-overlay");
const artistToggle = document.getElementsByClassName("artist-link")[0];

function toggleArtistOverlay() {
  console.log("toggling");
  if (artistOverlay.style.display == "none") {
    artistOverlay.style.display = "block";
  } else {
    artistOverlay.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  if (!artistOverlay) return;
  if (artistOverlay.contains(e.target)) return;
  if (artistOverlay.style.display == "none" && !artistToggle.contains(e.target))
    return;
  if (
    artistOverlay.style.display == "none" &&
    artistToggle.contains(e.target)
  ) {
    artistOverlay.style.display = "block";
    return;
  } else {
    artistOverlay.style.display = "none";
  }
});

// artistToggle.addEventListener("click", toggleArtistOverlay);
