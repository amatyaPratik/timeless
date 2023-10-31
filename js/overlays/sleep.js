let sleepTimeout

function turnOffPlayer(){
    // player.pause()
    if(player.isPlaying)
        player.playBtn.click()
    turnOffRain()
    endBubbles()
    stopVisualizer()
}

function sleepAfterMinutes(minutes){
    sleepTimeout = setTimeout(turnOffPlayer,minutes*60*1000)
}