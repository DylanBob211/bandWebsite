import { sec2time } from './abstract.js';

const mp3PlayerModule = (function(album) {
  const playBtn = document.getElementById("play");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");

  const listBtn = document.getElementById("list");
  const volBtn = document.querySelector('#volume');
  const barPointer = document.querySelector('#bar-pointer');
  const barSeeker = document.querySelector('#song-bar');

  /* Update Data On View*/

  function setSongDuration(song) {
    const songbar = document.querySelector('#song-bar');
    let totalDuration = sec2time(song.duration);
    songbar.setAttribute('data-after', totalDuration);
  }

  function setSongTitle(song) {
    const title = document.querySelector('#songtitle');
    title.innerHTML = song.title;
  }

  function setSongAuthor(album) {
    const author = document.querySelector('#songauthor');
    author.innerHTML = album.author;
  }

  function setAlbumName(album) {
    const albumName = document.querySelector('#albumname');
    albumName.innerHTML = album.name;
  }

  function updateCurrentTime(song){
    const songBar = document.querySelector('#song-bar');
    songBar.setAttribute('data-before', sec2time(song.currentTime));   
  }

  function updateSongData() {
    const currentSong = album.getCurrentSong();
    setSongDuration(currentSong);
    setSongTitle(currentSong);
    setSongAuthor(album);
    setAlbumName(album);
  }

  /* Bar Animation */
  
  let moveBarAnimationID;
  let startTime;


  // TODO: decouple updating factors

  function moveSongBarSeeker(timestamp, barPointer, dist, song) {
    let timeImpression = timestamp || new Date().getTime(); //segna il tempo iniziale
    let progress = (song.currentTime / song.duration) * 100; //in percentuale
    
    barPointer.style.left = progress + '%'; //sposta il cursore
    updateCurrentTime(album.getCurrentSong()) // cambia il tempo su schermo
    
    if (song.currentTime < song.duration && !song.paused) {
      moveBarAnimationID = requestAnimationFrame(timestamp => {
        moveSongBarSeeker(timeImpression, barPointer, dist, song);
      });
    }
  }

  /* Icon animation */

  function volumeBtnIcon(song){
    const volBtn = document.getElementById("volume");
    if (song.volume == 0){
      removeLastFaToken(volBtn);
      volBtn.classList.add('fa-volume-off')
        
    } else if (song.volume <= 0.5) {
      removeLastFaToken(volBtn);
      volBtn.classList.add('fa-volume-down')
        
    } else if (song.volume < 1.0) {
      removeLastFaToken(volBtn);
      volBtn.classList.add('fa-volume-up')
    }
  }

  /* PlayButton */

  function playButtonClickAnimation(isOn) {
    if (isOn) {
      playBtn.classList.remove('fa-play');
      playBtn.classList.add('fa-pause');
      playBtn.classList.add('pressed');
    } else {
      playBtn.classList.remove('fa-pause');
      playBtn.classList.remove('pressed');
      playBtn.classList.add('fa-play');
    }
  };

  async function togglePlay() {
    const currentSong = album.getCurrentSong();
    try {
      const isPaused = await currentSong.paused;
      if (isPaused) {
        currentSong.play();
        requestAnimationFrame(timestamp => {
          startTime = timestamp || new Date().getTime();
          moveSongBarSeeker(startTime, barPointer, barSeeker.clientWidth, currentSong);
        });
        playButtonClickAnimation(isPaused);
      } else {
        currentSong.pause();
        playButtonClickAnimation(isPaused);
        cancelAnimationFrame(moveBarAnimationID);
      } 
      return isPaused;
    } catch(e) {
      console.warn(e);
    }
  };

  /* BackButton  */

  async function previousSong() {
    if (moveBarAnimationID) cancelAnimationFrame(moveBarAnimationID);
    barPointer.style.left = 0;

    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    const currentTime = currentSong.now();
    currentSong.stop();
    if (currentTime < 3) {
      album.selectSong(album.songSelected - 1);
    }
    const newSong = album.getCurrentSong();
    if (isPlaying) {
      newSong.play();
      requestAnimationFrame(timestamp => {
        startTime = timestamp || new Date().getTime();
        moveSongBarSeeker(startTime, barPointer, barSeeker.clientWidth, newSong);
      });
    }
    updateSongData(newSong);
  };

  async function nextSong() {
    if (moveBarAnimationID) cancelAnimationFrame(moveBarAnimationID);
    barPointer.style.left = 0;
    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    currentSong.stop();
    album.selectSong(album.songSelected + 1);
    const newSong = album.getCurrentSong();
    if (isPlaying) {
      newSong.play();
      requestAnimationFrame(timestamp => {
        startTime = timestamp || new Date().getTime();
        moveSongBarSeeker(startTime, barPointer, barSeeker.clientWidth, newSong);
      });
    }
    updateSongData(newSong);
  };

  return {
    togglePlay,
    previousSong,
    nextSong,
    updateSongData
  }

});

export default mp3PlayerModule;