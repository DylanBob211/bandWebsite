import { toggleMenu } from './menu.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", toggleMenu);

import { playBtn, backBtn, nextBtn, songList,
     toggleSong, nextSong, prevSong,
      volumeOuter, updateVolBar, currentSong,
    bar, updateSongBar } from "./mp3-player.js";

import { songDataUpdate, volBtnIcon, removeLastFaToken } from './abstract.js'







//mp3 player main btns

playBtn.addEventListener('click', () => {toggleSong(songList[currentSong])});
backBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//body onload updates
document.querySelector('body').onload = function loadUpdates(){
    songDataUpdate(songList[currentSong]);  
    songList[currentSong].volume = 0.5;
    updateVolBar(null, songList[currentSong].volume)
}

// volume change when dragging

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
    songList[currentSong].pause();
    updateSongBar(ev.clientX);
    songList[currentSong].play();
})

const volBtn = document.querySelector('#volume')

volBtn.addEventListener('click', ev => {
    if(!songList[currentSong].muted) {
        songList[currentSong].muted = true;
        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-mute');
    } else {
        songList[currentSong].muted = false;
        removeLastFaToken(volBtn);
        volBtnIcon(songList[currentSong]);
    }
    
})

//FAI PULIZIA IN _mp3-player.scss

//CREA UNA SERIE DI CANZONI E FAI LA TRACKLIST
//STILIZZA LA TRACKLIST E LA POSIZIONE IN LANDSCAPE
//SISTEMA IL BOTTONE TRACKLIST

