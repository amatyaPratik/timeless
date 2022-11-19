const modesContainer = document.getElementById("modes-overlay");
const toggleModes = document.getElementById("btn-modes");

document.addEventListener("click", (e) => {
  if (!modesContainer) return;
  if (modesContainer.contains(e.target)) return;
  if (
    modesContainer.style.bottom == "-200px" &&
    !toggleModes.contains(e.target)
  )
    return;
  if (
    modesContainer.style.bottom == "-200px" &&
    toggleModes.contains(e.target)
  ) {
    modesContainer.style.bottom = "0";
    return;
  } else {
    modesContainer.style.bottom = "-200px";
  }
});
