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
    modesContainer.classList.contains('hide') &&
    toggleModes.contains(e.target)
  ) {
    modesContainer.classList.replace('hide','show')
    return;
  } else {
    modesContainer.classList.replace('show','hide')
  }
});
