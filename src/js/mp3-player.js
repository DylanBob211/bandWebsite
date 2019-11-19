import { volBtnIcon, songDataUpdate, setSongCurrentTimeOnScreen, removeLastFaToken } from './abstract.js';

const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
const pointer = document.querySelector('#bar-pointer');
const bar = document.querySelector('#song-bar');

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

