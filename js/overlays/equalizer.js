const equalizer = document.getElementById("equalizer");
const sidebar = document.getElementById("sidebar");
// equalizer.id = "equalizer";

// system.appendChild(equalizer);

const btnEqualizer = document.getElementById("btn-equalizer");

function toggleEqualizer() {
  if (equalizer.style.display != "flex") equalizer.style.display = "flex";
  else {
    equalizer.style.display = "none";
  }
}

// btnEqualizer.addEventListener("click", toggleEqualizer);

document.addEventListener("click", (e) => {
  if (equalizer.contains(e.target)) {
    return;
  } else if (btnEqualizer.contains(e.target)) {
    toggleEqualizer();
  } else if (
    (equalizer.style.display = "flex" && !sidebar.contains(e.target))
  ) {
    equalizer.style.display = "none";
  }
});