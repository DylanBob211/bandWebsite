import { toggleMenu } from './menu.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", toggleMenu);

import { songList, updateVolBar, currentSong } from "./mp3-player.js";

import { songDataUpdate } from './abstract.js'


//body onload updates
document.querySelector('body').onload = function loadUpdates(){
    songDataUpdate(songList[currentSong]);  
    songList[currentSong].volume = 0.5;
    updateVolBar(null, songList[currentSong].volume)
}

// volume change when dragging



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

