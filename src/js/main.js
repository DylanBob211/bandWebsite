import Menu from './menu.js';
import Song from './Song.js';
import Album from './Album.js';
import Mp3Player from './mp3_player.js';
import Gallery from './gallery.js';

//toggle menu-nav

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
  mp3Player.updateSongData(album.getCurrentSong());
  Gallery.initShowcase();
  Menu.init()
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

