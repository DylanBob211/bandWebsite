import Album from './Album.js';
import Song from './Song.js';

const mp3PlayerModule = (function() {
  const volBtn = document.querySelector('#volume');
  const playBtn = document.getElementById("play");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");
  const listBtn = document.getElementById("list");
  const pointer = document.querySelector('#bar-pointer');
  const bar = document.querySelector('#song-bar');

  const songList = [];
  let currentSong;


  function getCurrentSong() {
    return songList[currentSong];  
  }

  function changeSong(index) {
    currentSong = index;
  }

  

})();

export default mp3PlayerModule;