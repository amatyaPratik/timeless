const controls = document.getElementsByClassName("previousplaynext")[0];

const pauseBtn = document.createElement("button");
pauseBtn.id = "pause";
pauseBtn.className = "pause subtle circle";
pauseBtn.style.position = "absolute";
// pauseBtn.style.flex = 1;
// pauseBtn.style.display = "inline-block";
pauseBtn.style.cursor = "pointer";
pauseBtn.style.backgroundImage = "url(../res/images/icons/pause.png)";
controls.appendChild(pauseBtn);

pauseBtn.addEventListener("click", () => {
  player.setCurrentTime(0);
});
