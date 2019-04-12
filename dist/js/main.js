import {toggleMenu} from './menu.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", toggleMenu);

import { playBtn, backBtn, nextBtn, songList, toggleSong, nextSong, prevSong } from "./mp3-player.js";

import { Song } from './songs.js';




const songBar = document.getElementById("song-bar");
const pointer = songBar.querySelector('#bar-pointer');

 
let listBtnIsPressed = false; 
let volBtnIsPressed = false;



//canzoni nella cartella audio
const tiktok = new Song('Tik Tok', 'Kesha', './audio/Kesha-TiK ToK.mp3');
const test = new Song('Russian', 'rusfolks', './audio/test.mp3');
const evans = new Song('Spartacus Love Theme', 'Bill Evans', './audio/Spartacus Love Theme - Bill Evans Solo.mp3');
//aggiunte alla tracklist
tiktok.addToTracklist(songList);
test.addToTracklist(songList);
evans.addToTracklist(songList);

//mp3 player

playBtn.addEventListener('click', toggleSong);
backBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);









//FAI PULIZIA IN main.js sistema tutto in una classe!!!!
//FAI PULIZIA IN _mp3-player.scss
//FINISCI IL PULZANTE VOLUME E LA GESTIONE DEL VOLUME
//SISTEMA LA QUESTIONE DELLA DURATA E LA PROGRESSIONE DEL BRANO
//CREA UNA SERIE DI CANZONI E FAI LA TRACKLIST
//STILIZZA LA TRACKLIST E LA POSIZIONE IN LANDSCAPE
//SISTEMA IL BOTTONE TRACKLIST

