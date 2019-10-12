import { volBtnIcon, songDataUpdate, setSongCurrentTimeOnScreen, removeLastFaToken } from './abstract.js';

const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
const pointer = document.querySelector('#bar-pointer');
const bar = document.querySelector('#song-bar');

export let songList = [];
export let currentSong = 1;

//back button
function prevSong(){
    cancelAnimationFrame(requestMovebarAnimationReference)
    pointer.style.left = 0;
    //resent old data
    songList[currentSong].currentTime = 0;
    
    if(songList[currentSong].paused){
      currentSong--;
      if(currentSong < 0){
          currentSong = 0;
      }    
    } else {
        
        songList[currentSong].stop();
        currentSong--;
        if(currentSong < 0){
            currentSong = 0;
        }
        songList[currentSong].play();
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, songList[currentSong])
        })
    }
    //update newdata
    songDataUpdate(songList[currentSong]);
    songSelector(songList);
    
}

//next button
function nextSong() {
  if(requestMovebarAnimationReference) cancelAnimationFrame(requestMovebarAnimationReference);

  pointer.style.left = 0;
  //resent old data
  songList[currentSong].currentTime = 0;

  if(songList[currentSong].paused){
      
      currentSong++;
      if(currentSong > songList.length - 1){
          currentSong = 0;
      }    
  } else {
      
      songList[currentSong].stop();
      currentSong++;
      if(currentSong > songList.length - 1){
          currentSong = 0;
      }
      songList[currentSong].play();
      requestAnimationFrame(function(timestamp){
          starttime = timestamp || new Date().getTime();
          moveBar(timestamp, pointer, bar.clientWidth, songList[currentSong])
      })
  }
  songDataUpdate(songList[currentSong]);
  songSelector(songList);
}

//play/pause button
function toggleSong(song) {
    if(song.paused){
        //action
        console.log(song.duration);
        song.play();
        //style
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        playBtn.classList.add("pressed");
        //start bar animation
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, song)
        })
            
    } else {
        //action
        song.pause();
        //style
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        //stop animation

    }
    
}

//bar moving on play animation
var requestMovebarAnimationReference;
var starttime;
function moveBar(timestamp, el, dist, song){

    var timestamp = timestamp || new Date().getTime(); //segna il tempo iniziale
    var progress = (song.currentTime / song.duration) * 100; //in percentuale

    el.style.left = progress + '%'; //sposta il cursore
    setSongCurrentTimeOnScreen(songList[currentSong]); //setta il tempo trascorso
    if(song.currentTime < song.duration && !song.paused){
        requestMovebarAnimationReference = requestAnimationFrame(function(timestamp){
            moveBar(timestamp, el, dist, song);
        })
    }
}

//volume regulation
const volumeOuter = document.querySelector('#outer-slider');

export function updateVolBar(x, vol){
    
    const volumeInner = document.querySelector('#inner-slider');
    
    let volume = volumeOuter;
    let list = listBtn;
    var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft - (list.clientWidth / 2);
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }
        volumeInner.style.width = percentage + "%";
        
        songList.forEach( el => {
            el.volume = percentage / 100;
        })  
        console.log(songList[currentSong].volume) 

        volBtnIcon(songList[currentSong]);
}

const volBtn = document.querySelector('#volume')
//volume muted
volBtn.addEventListener('click', ev => {
    if(!songList[currentSong].muted) {
        //action
        songList[currentSong].muted = true;
        //style
        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-mute');
    } else {
        //action
        songList[currentSong].muted = false;
        //style
        removeLastFaToken(volBtn);
        volBtnIcon(songList[currentSong]);
    }
    
})

//song seeker
export function updateSongBar(x, currenttime){
    let songBar = bar;
    var percentage;
    if (currenttime){
        percentage = currrenttime * 100;
    } else {
        var position = x - songBar.offsetLeft;
        percentage = 100 * position / songBar.clientWidth;
    }
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    pointer.style.left = percentage + "%";
    songList[currentSong].currentTime = percentage / 100 * songList[currentSong].duration;
    setSongCurrentTimeOnScreen(songList[currentSong]);
    cancelAnimationFrame(requestMovebarAnimationReference);
    
}   

let dragVolumeBar = false;
let dragSongBar = false;

volumeOuter.addEventListener('mousedown', ev => {
    dragVolumeBar = true;
    updateVolBar(ev.clientX);
});
document.addEventListener('mouseup', () => {
    dragVolumeBar = false;
    dragSongBar = false;
})

document.addEventListener('mousemove', ev =>{
    if(dragVolumeBar){
        updateVolBar(ev.clientX);
    }
    if(dragSongBar){
        updateSongBar(ev.clientX);
    }
});


// set song current time when dragging


bar.addEventListener('mousedown', ev => {
    dragSongBar = true;
    if(songList[currentSong].paused){
        updateSongBar(ev.clientX);
    } else {
        songList[currentSong].pause();
        updateSongBar(ev.clientX);
        songList[currentSong].play();
    }
})

listBtn.addEventListener('click', (evTarget) => {
    toggleTracklist(evTarget);
})

function toggleTracklist(list){
    console.log("hello world")
    
}

export function songSelector(tracklist){
    tracklist.forEach((el, index) => {
        index === currentSong ? el.listHTMLElement.classList.add('selected') : el.listHTMLElement.classList.remove('selected')
    })
}

