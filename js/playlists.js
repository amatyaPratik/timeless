const btnTogglePlaylists = document.getElementById("btn-playlists-n-songs");

const collectionsPage = document.getElementById("songs-collection-overlay");
const playlistContainer = document.getElementById("quick-playlists");

const playlistBtnShadow = document.getElementsByClassName(
  "playlist-btn-shadow"
)[0];
const allPlaylists = document.getElementsByClassName("playlist-card-small");
const labelBar = document.getElementById("label-bar");
const collectionLabel = document.querySelector('label[for="songs-list"]');
const playlistOptions = document.getElementById("playlist-options");
const btnPlaylistOptions = document.getElementById("playlist-options-btn");
const backFromOptions = document.getElementById("back-from-options");
const btnOptionRename = document.querySelector('button[class="rename"]');
const btnOptionUpdate = document.querySelector('button[class="update"]');
const btnOptionDelete = document.querySelector('button[class="delete"]');

btnTogglePlaylists.addEventListener("mouseleave", () => {
  playlistBtnShadow.style.height = 0;
  playlistBtnShadow.style.width = 0;
});

btnTogglePlaylists.addEventListener("mouseenter", () => {
  playlistBtnShadow.style.height = "340px";
  playlistBtnShadow.style.width = "340px";
});

function updateLabel(nowActive) {
  collectionLabel.textContent = nowActive;
  // setTimeout(() => {
  //   collectionLabel.style.left = getBoundary(playlistContainer).right + "px";
  // }, 500);
}

document.addEventListener("click", (e) => {
  if (btnOptionUpdate.contains(e.target)) {
    // if (collectionsPage.classList.contains("editable"))
    //   collectionsPage.classList.remove("editable");
    // else
    togglePlaylistOptions();
    collectionsPage.classList.add("editable");
    return;
  }
  if (backFromOptions.contains(e.target)) {
    collectionsPage.classList.remove("editable");
  }
  if (labelBar.contains(e.target)) return;
  if (e.target.classList.contains("playlist-card-small")) {
    playlistContainer.classList.remove("active");

    for (let i = 0; i < allPlaylists.length; i++) {
      allPlaylists[i].classList.remove("active");
    }
    e.target.classList.add("active");
    updateLabel(e.target.textContent.toLowerCase());

    return;
  }
  if (
    playlistContainer.classList.contains("expanded") &&
    playlistContainer.contains(e.target)
  ) {
    for (let i = 0; i < allPlaylists.length; i++) {
      allPlaylists[i].classList.remove("active");
    }
    playlistContainer.classList.add("active");
    return;
  }
  if (
    !playlistContainer.classList.contains("expanded") &&
    playlistContainer.contains(e.target)
  ) {
    playlistContainer.classList.add("expanded");
    updateLabel("All songs");
    // collectionLabel.classList.add("expanded");
    return;
  }
  if (
    !playlistContainer.classList.contains("expanded") &&
    !playlistContainer.contains(e.target)
  ) {
    for (let i = 0; i < allPlaylists.length; i++) {
      allPlaylists[i].classList.remove("active");
    }
    playlistContainer.classList.add("active");
    updateLabel("All songs");
    if (playlistOptions.style.display != "none") {
      togglePlaylistOptions();
    }
    return;
  }
  if (
    playlistContainer.classList.contains("expanded") &&
    !playlistContainer.contains(e.target)
  ) {
    for (let i = 0; i < allPlaylists.length; i++) {
      allPlaylists[i].classList.remove("active");
    }
    playlistContainer.classList.remove("expanded");
    if (playlistOptions.style.display != "none") {
      togglePlaylistOptions();
    }
    playlistContainer.classList.add("active");
    updateLabel("All songs");
    return;
  }
});

function togglePlaylistOptions() {
  if (playlistOptions.style.display != "none") {
    playlistOptions.style.display = "none";
  } else {
    playlistOptions.style.left =
      getBoundary(btnPlaylistOptions).right + 5 + "px";
    playlistOptions.style.display = "block";
  }
}

btnPlaylistOptions.addEventListener("click", (e) => {
  if (
    playlistOptions.style.display == "none" &&
    !playlistContainer.contains(e.target) &&
    !labelBar.contains(e.target)
  ) {
    return;
  }

  if (
    btnPlaylistOptions.contains(e.target) &&
    playlistOptions.style.display == "none"
  ) {
    togglePlaylistOptions();
  } else if (
    btnPlaylistOptions.contains(e.target) &&
    playlistOptions.style.display != "none"
  ) {
    togglePlaylistOptions();
  }
});

// playlistContainer.addEventListener("mouseover", (e) => {
//   if (e.target.classList.contains("playlist-card-small")) {
//     e.target.getElementsByClassName("card-options-overlay")[0].style.display =
//       "flex";

//     // e.target.addEventListener("mouseout", (v) => {
//     //   v.target.getElementsByClassName("card-options-overlay")[0].style.display =
//     //     "none";
//     // });
//   } else {
//     const cards = [...document.getElementsByClassName("playlist-card-small")];
//     cards.forEach((card) => {
//       card.getElementsByClassName("card-options-overlay")[0].style.display =
//         "none";
//     });
//   }
// });

function addCardHoverEvent() {
  const cards = [...document.getElementsByClassName("playlist-card-small")];
  cards.forEach((card) => {
    card.addEventListener("mouseover", (e) => {
      if (card.contains(e.target)) {
        card.getElementsByClassName("card-options-overlay")[0].style.display =
          "flex";
      }
    });
    card.addEventListener("mouseout", (e) => {
      card.getElementsByClassName("card-options-overlay")[0].style.display =
        "none";
    });
  });
}

addCardHoverEvent();
