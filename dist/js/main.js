import {toggleMenu} from './menu.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", toggleMenu);

import { playBtn, backBtn, nextBtn, songList,
     toggleSong, nextSong, prevSong,
      volumeOuter, updateVolBar, currentSong} from "./mp3-player.js";

import { Song } from './songs.js';






//canzoni nella cartella audio
const tiktok = new Song('Tik Tok', 'Kesha', './audio/Kesha-TiK ToK.mp3');
const test = new Song('Russian', 'rusfolks', './audio/test.mp3');
const evans = new Song('Spartacus Love Theme', 'Bill Evans', './audio/Spartacus Love Theme - Bill Evans Solo.mp3');

//aggiunte alla tracklist
tiktok.addToTracklist(songList);
test.addToTracklist(songList);
evans.addToTracklist(songList);

//mp3 player main btns

playBtn.addEventListener('click', toggleSong);
backBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//body onload updates
document.querySelector('body').onload = function loadUpdates(){
    titleUpdate();
    
}
function titleUpdate() {
    const title = document.querySelector('#songtitle');

    title.innerHTML = songList[currentSong].title;
}

// volume in dragging

let drag = false;

volumeOuter.addEventListener('mousedown', ev =>{
    drag = true;
    updateVolBar(ev.clientX);
});
document.addEventListener('mouseup', () => {
    drag = false;
})

document.addEventListener('mousemove', ev =>{
    if(drag){
        updateVolBar(ev.clientX);
    }
});

const songBar = document.getElementById("song-bar");
const pointer = songBar.querySelector('#bar-pointer');




//da rifare tutto con calma e criterio
//fai una funzione che prende come paramentri la canzone in corso, la posizione del mouse dal dragging, 
function updateSongSeeker(totalSeconds){
    //totale in percentuale
    var percentage = totalSeconds * 100;
    // 1 percento
    
}   
//setta il momento della canzone alla nuova durata indicata dal cursore
        //per far cio serve sapere la posizione del cursore in relazioen alla barra della canzone
    //sposta il puntatore alla posizione 




//FAI PULIZIA IN _mp3-player.scss

//SISTEMA LA QUESTIONE DELLA DURATA E LA PROGRESSIONE DEL BRANO

//CREA UNA SERIE DI CANZONI E FAI LA TRACKLIST
//STILIZZA LA TRACKLIST E LA POSIZIONE IN LANDSCAPE
//SISTEMA IL BOTTONE TRACKLIST




