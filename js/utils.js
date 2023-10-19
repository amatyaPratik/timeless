/** returns boundingClientRect for a dom element */
const getBoundary = (elementDOM) => {
  return elementDOM.getBoundingClientRect();
};

/**
 * returns time in padded mm:ss format
 */

const getTimeInMmSs= (timeInMilliSeconds) =>{
  const timestamp_sec = timeInMilliSeconds/1000
  
    //Calculate minutes and seconds
    const minutes = Math.floor(timestamp_sec / 60)
    const seconds = Math.floor(timestamp_sec % 60)

    //Format as "mm:ss"
    let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime
}

/**The maximum is exclusive and the minimum is inclusive */
const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};


/** utility to display hint text to user */
const displayHint = (hintText) => {
  document.getElementById("hint").textContent = hintText;
  const clearHint = setTimeout(() => {
    document.getElementById("hint").textContent = "";
  }, 3000);
};

const hide = (element) => {
  element.style.opacity = 0;
};
const show = (element) => {
  element.style.opacity = 1;
};

const secondstommsss = (seconds) => {
  let formattedTime;

  if (seconds < 60) {
    formattedTime = "00:" + seconds;
  } else {
    let minutes = Math.floor(seconds / 60);
    let decimalMinutes = (seconds / 60) % minutes;
    let decimalSeconds = Math.floor(decimalMinutes * 60);

    formattedTime =
      ("0" + minutes).slice(-2) + ":" + ("0" + decimalSeconds).slice(-2);
  }
  return formattedTime;
};


function getRawAudioMedia(){
  return navigator.mediaDevices.getUserMedia({
    audio:{
      echoCancellation: false,
      autoGainControl: false,
      noiseSuppression: false,
      latency: 0
    }
  })
}