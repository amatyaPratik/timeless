let anyOverlay 
// = document.getElementById("any-overlay");
let anyToggle 
// = document.getElementsByClassName("any-link")[0];
// const toggleSleep = document.getElementById("sleep-btn");
const sleepOptions = document.querySelector('section#sleep-time-options')
const preferencesBtn = document.getElementById('preference-btn')
const sleepBtn = document.querySelector('.preference-btn#sleep')
const lockBtn = document.querySelector('.preference-btn#lock')
// const preferencesOverlay = document.querySelector("#preference-options")

const fxOverlay = document.getElementById("fx-overlay");
const fxs = document.getElementsByClassName("fx-btn");

function toggleAnyOverlay(toggleBtn, overlay) {
    anyToggle = toggleBtn
    anyOverlay = overlay
 
  if (anyOverlay.style.display == "none") {
    anyOverlay.style.display = "block";
  } else {
    anyOverlay.style.display = "none";
  }
}

function hideAllPreferenceOverlays(){
  sleepBtn.style.bottom = '-50px'
  lockBtn.style.bottom = '-50px'
  sleepBtn.style.transform = 'scale(0)'
  lockBtn.style.transform = 'scale(0)'
  sleepBtn.style.left = '10px'
  lockBtn.style.left = '10px'
  // sleepBtn.classList.remove('show')
  // lockBtn.classList.remove('show')
  preferencesBtn.classList.remove('expanded')
  sleepOptions.classList.remove('show')
}

document.addEventListener("click", (e) => {
  if (!anyOverlay) return;
  if (anyOverlay.contains(e.target)) return;
  if (anyOverlay.style.display == "none" && !anyToggle.contains(e.target))
    return;
  if (anyOverlay.style.display == "none" && anyToggle.contains(e.target)) {
    anyOverlay.style.display = "block";
    return;
  } else {
    anyOverlay.style.display = "none";
  }
});


document.addEventListener("click", (e) => {
  
  if(sleepBtn.contains(e.target)){
    
    lockBtn.style.transform = 'scale(0)'
    if(sleepOptions.classList.contains('show')){
      sleepOptions.classList.remove('show')
      lockBtn.style.transform = 'scale(1)'
    }
    else{
      sleepOptions.classList.add('show')
    }
    return
  }
  if(preferencesBtn.contains(e.target)){
    if(!preferencesBtn.classList.contains('expanded')){
      preferencesBtn.classList.add('expanded')
    }
    else{
      // preferencesBtn.classList.remove('expanded')
      hideAllPreferenceOverlays()
    }
      
    //console.log('preferencesOverlay: ',preferencesOverlay.classList);
    sleepBtn.style.bottom = '75px'
    lockBtn.style.bottom = '135px'
    sleepBtn.style.transform = 'scale(1)'
    lockBtn.style.transform = 'scale(1)'
    sleepBtn.style.left = '10px'
    lockBtn.style.left = '10px'
    // sleepBtn.classList.remove('hide')
    // lockBtn.classList.remove('hide')
    // preferencesOverlay.classList.remove('hide')
    if(preferencesBtn.classList.contains('expanded'))
    return
  }
  if(lockBtn.contains(e.target) || (!lockBtn.contains(e.target) && !sleepBtn.contains(e.target) && preferencesBtn.classList.contains('expanded'))){
    hideAllPreferenceOverlays()
  }
});