

const src = player.source //player.createMediaElementSource

const analyserNode = new AnalyserNode(player.context,{fftSize: 128})
console.log(analyserNode);
const gainNode = player.gainNode
const bassEQ = player.bassEQ
const midEQ = player.midEQ
const trebleEQ = player.trebleEQ

src
.connect(bassEQ)
.connect(midEQ)
.connect(trebleEQ)
.connect(gainNode)
.connect(analyserNode)
.connect(player.context.destination);

class Visualizer{
  x = 0; //initial canvas rect drawing position
  fftSize = 128
  canvas
  ctx
  bufferLength
  sampledArray
  barWidth
  barHeight
  dimension = {WIDTH:0, HEIGHT: 0}
  dotHeight
  dotGap = 15;
  analyserNode

  constructor(src, analyserNode, canvasRef){
    this.resize = this.resize.bind(this); 
    this.src = src
    this.canvas = document.getElementById("visualizer");
    this.analyserNode = analyserNode
    this.analyserNode.fftSize = this.fftSize;
    this.setupVisualizerCanvas()
    this.drawVisualizer();
    window.addEventListener('resize',this.resize)
  }

  setCanvas(canvasRef){
    this.canvas = canvasRef
  }

  setupVisualizerCanvas(){
    // this.canvas.width = window.innerWidth;
    // this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.globalAlpha = 0.8;
  
    // this.dimension.WIDTH = this.canvas.width;
    // this.dimension.HEIGHT = this.canvas.height;
    
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.dimension.WIDTH, this.dimension.HEIGHT);
  }
  
  drawFrame() {
    this.sampledArray.forEach((data, index) => {
      const barHeight = data * 1.3;
  
      let r = barHeight + 25 * (index / this.bufferLength);
      let g = 250 * (index / this.bufferLength);
      let b = 50;
  
      this.ctx.fillStyle = `rgb(${r},${g},${b})`;
      this.ctx.fillRect(this.x, this.dimension.HEIGHT - barHeight, this.barWidth, barHeight);
  
      this.x += this.barWidth;
    });
  }
  
  drawDotted() {
    this.dotHeight = this.barWidth; //square dot
    this.sampledArray.forEach((data, index) => {
      // let dotCount = 0;
      this.barHeight = data * 1.2;
      const extraHeight = this.barHeight % this.dotHeight;
  
      this.barHeight -= extraHeight;
  
      const dotsInBar = this.barHeight / this.dotHeight;
  
      let y = this.dimension.HEIGHT; //starting y position
  
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
  
        y -= this.dotHeight;
  
        this.ctx.fillStyle = dotColor;
        this.ctx.fillRect(this.x, y, this.barWidth, this.dotHeight);
  
        y -= this.dotGap;
  
        this.ctx.fillStyle = "rgba(0,0,0,0)";
        this.ctx.fillRect(this.x, y, this.barWidth, this.dotGap);
      }
  
      this.x += this.barWidth + this.dotGap;
    });
    // let smoothingDelay = setTimeout(() => {}, 3000);
  }
  
  drawVisualizer() {
    requestAnimationFrame(this.drawVisualizer.bind(this));

    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.sampledArray = new Uint8Array(this.bufferLength);
    this.analyserNode.getByteFrequencyData(this.sampledArray);
    this.dimension.WIDTH = this.canvas.width;
    this.dimension.HEIGHT = this.canvas.height;
    this.barWidth = (this.dimension.WIDTH / this.bufferLength) * 2;

    this.clearCanvas();
    this.drawFrame();
  }
  
  drawDottedVisualizer() {
    this.analyserNode.fftSize = 64;
    this.x = 0;
    this.clearCanvas();
    this.analyserNode.getByteFrequencyData(this.sampledArray);
    
    requestAnimationFrame(this.drawDottedVisualizer.bind(this));
    this.drawDotted();
  }

  resize(){
    this.canvas.width = this.canvas.clientWidth * window.devicePixelRatio
    this.canvas.height = this.canvas.clientHeight * window.devicePixelRatio
  }
  
}

document.addEventListener("DOMContentLoaded", function () {
  // const  canvas = document.getElementById("visualizer");
  const visualizer = new Visualizer(src,analyserNode)
});