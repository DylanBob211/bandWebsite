import Menu from './menu.js';
import Song from './Song.js';
import Album from './Album.js';
import Mp3Player from './mp3_player.js';

//toggle menu-nav
const threeLinesMenu = document.querySelector('.menu-btn');
threeLinesMenu.addEventListener("click", Menu.toggleMenu);


const tiktok = new Song('Tik Tok', '../../audio/kesha.mp3');
const russian = new Song('Russian', '../../audio/russian.mp3');
const evans = new Song('Spartacus Love Theme', '../../audio/evans.mp3');
const miller = new Song('Detroit', '../../audio/detroit.mp3');

const album = new Album('Far Gone', 'Scoop', '2018', null);
album.addTrackToAlbum(tiktok);
album.addTrackToAlbum(russian);
album.addTrackToAlbum(evans);
album.addTrackToAlbum(miller);

const mp3Player = Mp3Player(album);

document.querySelector('body').onload = function(ev) {
  mp3Player.updateSongData(album.getCurrentSong())
}

// MP3 PLAYER Button Click events

const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

playBtn.addEventListener('click', mp3Player.togglePlay);
backBtn.addEventListener('click', mp3Player.previousSong);
nextBtn.addEventListener('click', mp3Player.nextSong);

// MP3 PLAYER Dragging events

const volumeOuter = document.querySelector('#outer-slider');
const barSeeker = document.querySelector('#song-bar');

let dragVolumeBar = false;
let dragSongBar = false;

volumeOuter.addEventListener('mousedown', ev => {
    dragVolumeBar = true;
    //updateVolBar(ev.clientX);
});

barSeeker.addEventListener('mousedown', ev => {
  dragSongBar = true;
  mp3Player.onBarClick(ev.clientX);
});

document.addEventListener('mouseup', () => {
  dragVolumeBar = false;
  dragSongBar = false;
})
// dragging
document.addEventListener('mousemove', ev =>{
  if(dragVolumeBar){
    //updateVolBar(ev.clientX);
  }
  if(dragSongBar){
    mp3Player.updateBarPointer(ev.clientX);
  }
});

//body onload updates
// document.querySelector('body').onload = function loadUpdates(){
//   songDataUpdate(songList[currentSong]);  
//   songList[currentSong].volume = 0.5;
//   updateVolBar(null, songList[currentSong].volume);
//   songSelector(songList);
// }

// songList.forEach((listElement, index) => {
//   listElement.listHTMLElement.addEventListener('click', (event) => {  
//     currentSong = index;
//     songSelector(songList);
//   })
// })



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
