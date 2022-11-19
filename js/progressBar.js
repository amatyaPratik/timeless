const input = document.querySelector("input#progress");
const progressTime = document.getElementById("progress-time");
const endTime = document.getElementById("end-time");
const lockBtn = document.getElementById("lock");
const favBtn = document.getElementsByClassName("btn-favorite")[0];

const totalWidth = getBoundary(input).width;

input.addEventListener("input", (e) => {
  player.skipTo(e.target.value);
  updateProgressInfo(e.target.value);
  showTimeLimits();
  document.addEventListener("mouseup", hideTimeLimits);
});

function updateProgressInfo(percent) {
  const duration = player.getDuration();
  let formattedSongTotal = secondstommsss(duration.total);
  let formattedSongProgressed = secondstommsss(duration.current);

  progressTime.textContent = formattedSongProgressed;
  endTime.textContent = formattedSongTotal;
}

function showTimeLimits() {
  progressTime.classList.add("show");
  endTime.classList.add("show");
}

function hideTimeLimits() {
  progressTime.classList.remove("show");
  endTime.classList.remove("show");
  document.removeEventListener("mousemove", document);
}
