const play = document.getElementsByClassName("play")[0];
const previous = document.getElementsByClassName("previous")[0];
const next = document.getElementsByClassName("next")[0];
const previousplaynext = document.getElementsByClassName("previousplaynext")[0];
const carouselContainer = document.getElementById("carousel-container");
const images = carouselContainer.getElementsByClassName("images")[0];
const imgWidth = getBoundary(images.getElementsByTagName("img")[0]).width;
const imgArray = [...images.getElementsByTagName("img")];
let ignore = true;

// for (i = 0; i < imgArray.length; i++) {
//   const tempImg = imgArray[i].cloneNode(true);
//   images.appendChild(tempImg);
// }
const firstImg = imgArray[0].cloneNode(true);
images.appendChild(firstImg);

const secondImg = imgArray[1].cloneNode(true);
images.appendChild(secondImg);

const slideWidth = 50;
const slides = 7;
let currentSlide = 0;
let moved = 0;

function slideLeft() {
  // moved++;
  if (-images.offsetLeft == (slides - 1) * imgWidth - 1) {
    images.style.left = 0 + "px";
  }
  if (
    images.offsetLeft % imgWidth == 0 ||
    (images.offsetLeft + 1) % imgWidth == 0
  ) {
    ignore = true;
    // moved = 0;
    images.style.left = images.offsetLeft - 1 + "px";
    setTimeout(() => {
      ignore = false;
    }, 1000);
  }

  window.requestAnimationFrame(slideLeft);
  if (ignore) return;
  images.style.left = images.offsetLeft - 1 + "px";

  // console.log("offl", images.offsetLeft);
}

// const slideshow = setInterval(slideLeft, 1000);

window.requestAnimationFrame(slideLeft);
