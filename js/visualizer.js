const canvas = document.getElementById("visualizer");

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

    let r = barHeight + 25 * (index / bufferLength);
    let g = 250 * (index / bufferLength);
    let b = 50;

    ctx.fillStyle = `rgb(${r},${g},${b})`;
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
          dotColor = "darkgreen";
          break;
        case 3:
        case 4:
        case 5:
          dotColor = "lime";
          break;
        case 6:
        case 7:
        case 8:
          dotColor = "orange";
          break;
        case 9:
        case 10:
        case 11:
          dotColor = "yellow";
          break;
        case 12:
        case 13:
        case 14:
          dotColor = "pink";
          break;
        default:
          dotColor = "red";
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
  requestAnimationFrame(drawVisualizer);
  drawFrame(sampledArray, barWidth, barHeight, x);
}

function drawDottedVisualizer() {
  analyser.fftSize = 128;
  x = 0;
  clearCanvas();
  analyser.getByteFrequencyData(sampledArray);
  requestAnimationFrame(drawDottedVisualizer);
  drawDotted(sampledArray, barWidth, barHeight, x);
}

// drawVisualizer();
drawDottedVisualizer();