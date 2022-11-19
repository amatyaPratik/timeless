// const volumeContainer = document.getElementById("volume-container");
// const volume = document.getElementById("volume");
// const setVolume = document.getElementById("set");
// const btnVolume = document.getElementById("btn-volume");

// const artistOverlay = document.getElementById("artist-overlay");
// const system = document.getElementById("timeless");

// let previous_volume;

// btnVolume.addEventListener("mouseenter", () => {
//   volumeContainer.style.display = "block";
//   volumeContainer.focus();
// });
// volumeContainer.addEventListener("mouseout", () => {
//   volumeContainer.style.display = "none";
// });

// btnVolume.addEventListener("click", () => {
//   if (!muted) {
//     mute();
//   } else {
//     unmute();
//   }
// });

// volume.addEventListener("mousedown", (e) => {
//   let totalHeight = e.clientY;
//   let newHeight = Math.floor(getBoundary(volume).height - totalHeight);
//   setVolume.style.height = newHeight + "px";
//   previous_volume = Math.abs(newHeight / getBoundary(volume).height).toFixed(2);
//   audio.volume = previous_volume;
// });

// system.addEventListener("click", (e) => {
//   if (
//     e.target.id != "volume-container" &&
//     e.target.id != "volume" &&
//     e.target.id != "set" &&
//     volumeContainer.style.display != "none"
//   ) {
//     volumeContainer.style.display = "none";
//   }
// });

// system.addEventListener("wheel", (e) => {
//   if (collectionsOverlay.contains(e.target)) return;
//   volumeContainer.style.display = "block";
//   let dy;

//   if (e.target.id != "sidebar") {
//     if (
//       getBoundary(setVolume).height >= getBoundary(volume).height &&
//       e.deltaY < 0
//     ) {
//       dy = 0;
//       setVolume.style.height = "100%";
//     } else if (setVolume.style.height.split("px")[0] <= 0 && e.deltaY > 0) {
//       dy = 0;
//       setVolume.style.height = "0%";
//     } else {
//       dy = Math.ceil(e.deltaY * -0.01) * 10;
//     }

//     let currentVolume = getBoundary(setVolume).height;
//     setVolume.style.height = currentVolume + dy + "px";

//     previous_volume = Math.abs(
//       (currentVolume + dy) / getBoundary(volume).height
//     ).toFixed(2);
//     audio.volume = previous_volume;
//   }
// });
