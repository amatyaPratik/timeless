const songsTable = document.getElementById("songs-table");
const alphabeticalScroller = document.getElementsByClassName(
  "alphabetical-scroller"
)[0];

const songsPage = document.getElementById("songs-page");

alphabeticalScroller.addEventListener("click", (e) => {
  const scrollerHeight = getBoundary(alphabeticalScroller).height;
  const scrolledPortion = e.clientY;
  const scrolledPercent = (scrolledPortion / scrollerHeight) * 100;
  const totalHeight = getBoundary(songsPage).bottom;

  console.log("toscroll", Math.floor((scrolledPercent * totalHeight) / 100));
  //   Math.floor(scrolledPercent * totalHeight),
  songsPage.scroll({
    top: Math.floor((scrolledPercent * totalHeight) / 100),
    left: 0,
  });
});
