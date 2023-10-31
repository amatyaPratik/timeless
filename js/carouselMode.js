const play = document.getElementsByClassName("play")[0];
const previous = document.getElementsByClassName("previous")[0];
const next = document.getElementsByClassName("next")[0];
const previousplaynext = document.getElementsByClassName("previousplaynext")[0];
const carouselContainer = document.getElementById("carousel-container");
const allImages = carouselContainer.getElementsByClassName("images")[0];
const imgWidth = getBoundary(allImages.getElementsByTagName("img")[0]).width;

const imgArray = [...allImages.getElementsByTagName("img")];

const ANIMATION_DELAY = 5; // seconds
const SLIDE_PAUSE = 1;
const FRAME_RATE = 60; // Adjust the frame rate as needed
let pauseAnimation = false;

const gainNode = player.gainNode;
const bassEQ = player.bassEQ;
const midEQ = player.midEQ;
const trebleEQ = player.trebleEQ;
const src = player.source;
const analyser = player.context.createAnalyser();

src
  .connect(bassEQ)
  .connect(midEQ)
  .connect(trebleEQ)
  .connect(gainNode)
  .connect(player.context.destination);

const images = document.querySelector(".images");

let currentSlide = 0;
let requestID;

// Clone the first two images for seamless scrolling
const firstImg = images.children[0].cloneNode(true);
images.appendChild(firstImg);

const secondImg = images.children[1].cloneNode(true);
images.appendChild(secondImg);

const numImages = images.querySelectorAll('img').length; // Total number of images, including cloned ones

// Set the initial position of the carousel
images.style.left = 0;

let previousFrameTime = 0;

// Function to slide the carousel left
function slideLeft(timestamp) {
  if (!pauseAnimation) {
    if (!previousFrameTime) {
      previousFrameTime = timestamp;
    }

    const deltaTime = timestamp - previousFrameTime;
    const frameInterval = 1000 / FRAME_RATE;

    if (deltaTime >= frameInterval) {
      previousFrameTime = timestamp;

      if (currentSlide >= numImages - 1) {
        images.style.transition = "none"; // Disable transition for instant reset
        images.style.left = 0;
        currentSlide = 1;
        requestID = requestAnimationFrame(slideLeft);
      } else {
        images.style.transition = `left ${ANIMATION_DELAY}s linear`;
        images.style.left = -currentSlide * imgWidth + "px";
        currentSlide++;
        setTimeout(() => {
          requestID = requestAnimationFrame(slideLeft);
        }, (ANIMATION_DELAY + SLIDE_PAUSE) * 1000); // Pause for 5s after each image meets the left edge + 1s display wait
      }
    } else {
      requestID = requestAnimationFrame(slideLeft);
    }
  } else {
    images.style.transition = "left 0s linear !important";
    cancelAnimationFrame(requestID); // Pause the animation
  }
}

function startAnimation() {
  requestID = requestAnimationFrame(slideLeft);
}

function stopAnimation() {
  // console.log('ent');
  // pauseAnimation = true;
}

function resumeAnimation() {
  // console.log('leave');
  // pauseAnimation = false;
  // requestID = requestAnimationFrame(slideLeft);
}

// Start the carousel animation
startAnimation();
