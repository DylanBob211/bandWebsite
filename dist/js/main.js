import {toggleMenu} from './menu.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", toggleMenu);

import { playBtn, backBtn, nextBtn, songList, 
    volBtn, toggleSong, nextSong, prevSong
    , volumeOuter, volumeInner, updateBar} from "./mp3-player.js";

import { Song } from './songs.js';




const songBar = document.getElementById("song-bar");
const pointer = songBar.querySelector('#bar-pointer');


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

//xtra-btns



//per il volume devi legare il valore del volume dall'API audio al range
//se il range e' al massimo il volume e' a 1.0
let drag = false;

volumeOuter.addEventListener('mousedown', ev =>{
    drag = true;
    updateBar(ev.clientX);
});
window.addEventListener('mouseup', () => {
    drag = false;
})

document.addEventListener('mousemove', ev =>{
    if(drag){
        updateBar(ev.clientX);
    }
});

//ricorda di farne un metodo static della classe Song


//bug need event for mouse up
//devo capire cosa fa questo codice per bene. 





//FAI PULIZIA IN _mp3-player.scss

//FINISCI IL PULZANTE VOLUME E LA GESTIONE DEL VOLUME
//SISTEMA LA QUESTIONE DELLA DURATA E LA PROGRESSIONE DEL BRANO
//CREA UNA SERIE DI CANZONI E FAI LA TRACKLIST
//STILIZZA LA TRACKLIST E LA POSIZIONE IN LANDSCAPE
//SISTEMA IL BOTTONE TRACKLIST

