const toggleSleep = document.getElementById("sleep-btn");
const sleepOptions = document.getElementById("sleep-options-overlay");

toggleSleep.addEventListener("click", (e) => {
  if (sleepOptions.style.display == "none") {
    sleepOptions.style.display = "block";
    console.log(getBoundary(e.target).right);
    sleepOptions.style.left = getBoundary(e.target).right + "px";
  } else {
    sleepOptions.style.display = "none";
  }
});

const fxOverlay = document.getElementById("fx-overlay");
const fxBtn = document.getElementById("btn-fx");
const fxs = document.getElementsByClassName("fx-btn");

document.addEventListener("click", (e) => {
  if (fxBtn.contains(e.target)) {
    if (fxOverlay.style.display == "none") {
      fxOverlay.style.display = "block";
      fxOverlay.style.transform = "rotate(180deg)";
      fxOverlay.style.left = getBoundary(e.target).right + 20 + "px";
      fxOverlay.style.top = getBoundary(e.target).bottom - 20 + "px";
      fxOverlay.style.transform = "translate(-50%,-50%)";
      fxs[0].style.width = "50px";
      fxs[0].style.height = "50px";
      fxs[1].style.width = "50px";
      fxs[1].style.height = "50px";
      fxs[2].style.width = "50px";
      fxs[2].style.height = "50px";
      fxOverlay.style.backdropFilter = " blur(10px)";
    } else {
      fxOverlay.style.left = "-100px";
      fxOverlay.style.transform = "rotate(180deg)";
      fxOverlay.style.display = "none";
      fxs[0].style.width = "0px";
      fxs[0].style.height = "0px";
      fxs[1].style.width = "0px";
      fxs[1].style.height = "0px";
      fxs[2].style.width = "0px";
      fxs[2].style.height = "0px";
    }
    return;
  } else if (player.system.contains(e.target)) {
    fxOverlay.style.left = "-100px";
    fxOverlay.style.transform = "rotate(180deg)";
    fxOverlay.style.display = "none";
    fxs[0].style.width = "0px";
    fxs[0].style.height = "0px";
    fxs[1].style.width = "0px";
    fxs[1].style.height = "0px";
    fxs[2].style.width = "0px";
    fxs[2].style.height = "0px";
  }
});
