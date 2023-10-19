let anyOverlay 
// = document.getElementById("any-overlay");
let anyToggle 
// = document.getElementsByClassName("any-link")[0];

function toggleAnyOverlay(toggleBtn, overlay) {
    anyToggle = toggleBtn
    anyOverlay = overlay
 
  if (anyOverlay.style.display == "none") {
    anyOverlay.style.display = "block";
  } else {
    anyOverlay.style.display = "none";
  }
}

document.addEventListener("click", (e) => {
  if (!anyOverlay) return;
  if (anyOverlay.contains(e.target)) return;
  if (anyOverlay.style.display == "none" && !anyToggle.contains(e.target))
    return;
  if (anyOverlay.style.display == "none" && anyToggle.contains(e.target)) {
    anyOverlay.style.display = "block";
    return;
  } else {
    anyOverlay.style.display = "none";
  }
});

// anyToggle.addEventListener("click", toggleAnyOverlay);
