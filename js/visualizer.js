const canvas = document.getElementById("visualizer");

let visualizerMode = 'none'
let requestedAnimationFrame

const src = player.source

const analyser = player.context.createAnalyser();

const gainNode = player.gainNode
const bassEQ = player.bassEQ
const midEQ = player.midEQ
const trebleEQ = player.trebleEQ

src
.connect(bassEQ)
.connect(midEQ)
.connect(trebleEQ)
.connect(gainNode)
.connect(analyser)
.connect(player.context.destination);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.globalAlpha = 0.8;

analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;

const sampledArray = new Uint8Array(bufferLength);

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const dotGap = 15; // px

const barWidth = (WIDTH / bufferLength) * 2;
const dotHeight = barWidth; //square dot
let barHeight; //tbd

let x = 0; //initial canvas rect drawing position

function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawFrame(sampledArray, barWidth, barHeight, x) {
  sampledArray.forEach((data, index) => {
    barHeight = data * 1.3;
    const borderRadius = 10;
    let r = barHeight + 25 * (index / bufferLength);
    let g = 250 * (index / bufferLength);
    let b = 50;

    ctx.fillStyle = `rgb(${r},${g},${b})`;

    // // Begin the path
    // ctx.beginPath();
    // // Draw the rounded rectangle
    // ctx.moveTo(x + borderRadius, y);
    // ctx.lineTo(x + barWidth - borderRadius, y);
    // ctx.arcTo(x + barWidth, y, x + barWidth, y + borderRadius, borderRadius);
    // ctx.lineTo(x + barWidth, y + dotHeight - borderRadius);
    // ctx.arcTo(x + barWidth, y + dotHeight, x + barWidth - borderRadius, y + dotHeight, borderRadius);
    // ctx.lineTo(x + borderRadius, y + dotHeight);
    // ctx.arcTo(x, y + dotHeight, x, y + dotHeight - borderRadius, borderRadius);
    // ctx.lineTo(x, y + borderRadius);
    // ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
    // // Set the fill color
    // ctx.fillStyle = dotColor;
    // // Fill the rounded rectangle
    // ctx.fill();
    // // Close the path
    // ctx.closePath();

    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth;
  });
}

function drawDotted(sampledArray, barWidth, barHeight, x) {
  sampledArray.forEach((data, index) => {
    // let dotCount = 0;
    barHeight = data * 1.2;
    extraHeight = barHeight % dotHeight;

    barHeight -= extraHeight;

    const dotsInBar = barHeight / dotHeight;

    let y = HEIGHT; //starting y position

    for (let i = 0; i < dotsInBar; i++) {
      let dotColor;
      switch (i) {
        case 0:
        case 1:
        case 2:
          dotColor = "blue";
          break;
        case 3:
        case 4:
        case 5:
          dotColor = "greenyellow";
          break;
        case 6:
        case 7:
        case 8:
          dotColor = "yellowgreen";
          break;
        case 9:
        case 10:
        case 11:
          dotColor = "orange";
          break;
        case 12:
        case 13:
        case 14:
          dotColor = "crimson";
          break;
        default:
          dotColor = "purple";
      }

      y -= dotHeight;

      ctx.fillStyle = dotColor;
      ctx.fillRect(x, y, barWidth, dotHeight);

      y -= dotGap;

      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(x, y, barWidth, dotGap);
    }

    x += barWidth + dotGap;
  });
  let smoothingDelay = setTimeout(() => {}, 3000);
}

function drawVisualizer() {
  analyser.fftSize = 256;
  x = 0;
  clearCanvas();
  analyser.getByteFrequencyData(sampledArray);
  requestedAnimationFrame = requestAnimationFrame(drawVisualizer);
  drawFrame(sampledArray, barWidth, barHeight, x);
}

function drawDottedVisualizer() {
  analyser.fftSize = 128;
  x = 0;
  clearCanvas();
  analyser.getByteFrequencyData(sampledArray);
  requestedAnimationFrame = requestAnimationFrame(drawDottedVisualizer);
  drawDotted(sampledArray, barWidth, barHeight, x);
}

function stopVisualizer(){
  cancelAnimationFrame(requestedAnimationFrame)
  clearCanvas()
}

function toggleVisualizer(){
  const btn = document.querySelector('#btn-visualizer.btn-visualizer')
  if(visualizerMode !== 'none'){
    if(visualizerMode === 'dotted'){
      visualizerMode = 'bars'
      btn.classList.remove('off')
      btn.classList.add('on')
      btn.style.backgroundImage = "url(./res/images/icons/sidebar/histogram.svg)"
      stopVisualizer()
      drawVisualizer()
    }
    else{
      btn.classList.add('off')
      btn.classList.remove('on')
      visualizerMode = 'none'
      btn.style.backgroundImage = "url(./res/images/icons/sidebar/visualizer-empty.svg)"
      stopVisualizer()
    }
  }else{
    btn.classList.remove('off')
    btn.classList.add('on')
    visualizerMode = 'dotted'
    btn.style.backgroundImage = "url(./res/images/icons/sidebar/dotted-visualizer.svg)"
    drawDottedVisualizer();
  }
}
