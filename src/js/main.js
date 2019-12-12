import Menu from './menu.js';
import Mp3Player from './mp3_player.js';
import Showcase from './showcase.js';
import Contact from './contact.js';

document.querySelector('body').onload = function(ev) {
  Mp3Player.init();
  Contact.init();
  Showcase.init();
  Menu.init();
}

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

