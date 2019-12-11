import Menu from './menu.js';
import Song from './Song.js';
import Album from './Album.js';
import Mp3Player from './mp3_player.js';
import Gallery from './gallery.js';

//toggle menu-nav

const ghost = new Song('Still Awake', '../../music/ghostrifter-official-still-awake.mp3');
const redlips = new Song('Red Lips', '../../music/deoxys-beats-redlips.mp3');

const album = new Album('Far Gone', 'Scoop', '2018', null);
album.addTrackToAlbum(ghost);
album.addTrackToAlbum(redlips);

const mp3Player = Mp3Player(album);

document.querySelector('body').onload = function(ev) {
  mp3Player.init();
  Gallery.initShowcase();
  Menu.init()
  setTimeout(() => {
    document.querySelector('#arrow h1').classList.add('active');
    document.querySelector('#arrow i').classList.add('active');
  }, 4500)
}

// MP3 PLAYER Button Click events

const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");



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

//scroll into view

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});