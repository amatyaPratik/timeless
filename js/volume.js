// Variables to track the drag state
let isDragging = false;
let initialMouseY = 0;
let initialVolumeHeight = 0;

// Event listener for mouse down to start dragging
player.volumeHollow.addEventListener("mousedown", (e) => {
  isDragging = true;
  initialMouseY = e.clientY;
  initialVolumeHeight = getBoundary(player.volumeFilled).height;
});

// Event listener for mouse move while dragging
player.system.addEventListener("mousemove", (e) => {
  if (isDragging) {
    e.preventDefault();
    let mouseY = e.clientY;
    let deltaY = mouseY - initialMouseY;
    let newHeight = initialVolumeHeight - deltaY;

    if (newHeight < 0) {
      newHeight = 0;
    } else if (newHeight > getBoundary(player.volumeHollow).height) {
      newHeight = getBoundary(player.volumeHollow).height;
    }

    player.volumeFilled.style.height = newHeight + "px";

    player.volume = Math.abs(newHeight / getBoundary(player.volumeHollow).height).toFixed(2);
    player.previous_volume = player.volume;
    player.setVolume(player.volume > 1 ? 1 : player.volume);
  }
});

// Event listener for mouse up to stop dragging
player.system.addEventListener("mouseup", () => {
  isDragging = false;
});

// Event listener for mouse leave to stop dragging if the mouse leaves the volume control
player.system.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
  }
});