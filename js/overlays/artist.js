const artistOverlay = document.getElementById("artist-overlay");
const secondArtistCard = document.getElementsByClassName("artist-card")[1];

function toggleArtistOverlay() {
  //console.log("toggling");
  if (artistOverlay.style.display == "none") {
    artistOverlay.style.display = "block";
  } else {
    artistOverlay.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  if (!artistOverlay) return;
  if (artistOverlay.contains(e.target)) return;
  if (artistOverlay.style.display == "none" && !secondArtistCard.contains(e.target))
    return;
  if (
    !artistOverlay.classList.contains('show') &&
    secondArtistCard.contains(e.target)
  ) {
    artistOverlay.classList.add('show')
    return;
  } else {
    artistOverlay.classList.remove('show')
  }
});

// secondArtistCard.addEventListener("click", toggleArtistOverlay);
