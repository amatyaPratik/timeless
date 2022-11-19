const songsList = document.getElementById("songs-list");

const quickSearch = document.getElementById("quick-search");

quickSearch.addEventListener("input", (e) => {
  const songItem = songsList.getElementsByTagName("li");
  for (let i = 0; i < songItem.length; i++) {
    if (
      !songItem[i].textContent
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      songItem[i].style.display = "none";
    } else {
      songItem[i].style.display = "block";
    }
  }
});

songsList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() == "li") {
    player.playTitle(e.target.textContent);
    quickSearch.textContent = "";
    btnTogglePlaylists.click();
    // console.log(btnTogglePlaylists);
  }
});
