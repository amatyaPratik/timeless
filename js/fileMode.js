const file = document.querySelector("input[type='file']");
file.onchange = function () {
  const files = this.files;
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
  audio.play();
  // file.style.top = "-10vh";
  songIndex = -1;
  chosenScheme = "repeat";
  // currentScheme = changeSchemes[currentSchemeIndex];
  title.textContent = files.value.split("\\")[2].toUpperCase().split(".")[0];
  // randomPlayMode = true;
};
