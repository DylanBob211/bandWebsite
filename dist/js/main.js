import Menu from './menu.js';
import { Song } from './songs.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", Menu.toggleMenu);

import { songList, updateVolBar, currentSong, songSelector } from "./mp3-player.js";

import { songDataUpdate } from './abstract.js'

const tiktok = new Song('Tik Tok', 'Kesha', './audio/Kesha-TiK ToK.mp3');
const test = new Song('Russian', 'rusfolks', './audio/test.mp3');
const evans = new Song('Spartacus Love Theme', 'Bill Evans', './audio/Spartacus Love Theme - Bill Evans Solo.mp3');
const miller = new Song('Detroit', 'Marcus Miller', './audio/Miller-Detroit.mp3');

//body onload updates
document.querySelector('body').onload = function loadUpdates(){
    songDataUpdate(songList[currentSong]);  
    songList[currentSong].volume = 0.5;
    updateVolBar(null, songList[currentSong].volume);
    songSelector(songList);
    
}

songList.forEach((listElement, index) => {
  listElement.listHTMLElement.addEventListener('click', (event) => {  
    currentSong = index;
    songSelector(songList);
  })
})



//FAI PULIZIA IN _mp3-player.scss
//RISISTEMA I MODULI IN /js E FAI PULIZIA

//CREA UNA SERIE DI CANZONI E FAI LA TRACKLIST
//STILIZZA LA TRACKLIST E LA POSIZIONE IN LANDSCAPE
//SISTEMA IL BOTTONE TRACKLIST

//SISTEMA LO STILE DELLA BARRA NAV IN ALTO
//SISTEMA IL FOOTER IN BASSO

//SCOPRI LE ANIMAZIONI IN SCROLLING DI CSS
//SISTEMA LO STYLING DI NEWS

//SISTEMA LA PRIMA PAGINA E SCRIVI QUALCOSA SOTTO SCOOP

//CREA LE ALTRE PAGINE HTML

