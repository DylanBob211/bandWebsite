import { sec2time } from './abstract.js';

const mp3PlayerModule = (function (album) {
  const playBtn = document.getElementById("play");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");

  const listBtn = document.getElementById("list");
  const volBtn = document.querySelector('#volume');
  const barPointer = document.querySelector('#bar-pointer');
  const barSeeker = document.querySelector('#song-bar');

  let animID;
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

  function updateCurrentTime(song) {
    const songBar = document.querySelector('#song-bar');
    songBar.setAttribute('data-before', sec2time(song.now()));
  }

  function updateSongData() {
    const currentSong = album.getCurrentSong();
    setSongDuration(currentSong);
    setSongTitle(currentSong);
    setSongAuthor(album);
    setAlbumName(album);
  }



  function updateBarPointer(x, currentTime) {
    let percentage;
    if (currentTime) {
      percentage = currentTime * 100;
    } else {
      let position = x - barSeeker.offsetLeft;
      percentage = 100 * position / barSeeker.clientWidth;
    }
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    barPointer.style.left = percentage + "%";
    const currentSong = album.getCurrentSong();
    currentSong.setTime(percentage / 100 * currentSong.duration);
    updateCurrentTime(currentSong);
    if (animID) {
      cancelAnimationFrame(animID);
    }
    
  }

  async function onBarClick(x) {
    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    if (isPlaying) {
      currentSong.pause();
      updateBarPointer(x);
      currentSong.play()
    } else {
      updateBarPointer(x);
    }
  }

  /* Icon animation */

  function volumeBtnIcon(song) {
    const volBtn = document.getElementById("volume");
    if (song.volume == 0) {
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

  /* Volume */

  /* Bar Animation and Time */

  function playSong(currentSong) {
    currentSong.play();
    startBarAnimation();
  }

  function pauseSong(currentSong) {
    currentSong.pause();
    stopBarAnimation();
  }

  function resetSong(currentSong) {
    currentSong.stopBarAnimation();
    stopBarAnimation();
    barPointer.style.left = 0;
    updateCurrentTime(currentSong);
  }


  function startBarAnimation(timestamp) {
    animID = requestAnimationFrame(() => update(timestamp));
  };

  function update(timestamp) {
    const currentSong = album.getCurrentSong();
    let timeImpression = timestamp || new Date().getTime(); //prende il tempo iniziale o quello trascorso
    let progress = (currentSong.currentTime / currentSong.duration) * 100; //in percentuale

    barPointer.style.left = progress + '%'; //sposta il cursore
    updateCurrentTime(currentSong);
    if (currentSong.currentTime < currentSong.duration && !currentSong.paused) {
      startBarAnimation(timeImpression);
    } else {
      stopBarAnimation();
    }
  };

  function stopBarAnimation() {
    if (animID) {
      cancelAnimationFrame(animID);
      animID = null;
    }

  }

  /* PlayButton */

  async function togglePlay() {
    const currentSong = album.getCurrentSong();
    try {
      const isPaused = await currentSong.paused;
      if (isPaused) {
        playSong(currentSong);
        playButtonClickAnimation(isPaused);
      } else {
        pauseSong(currentSong)
        playButtonClickAnimation(isPaused);
      }
      return isPaused;
    } catch (e) {
      console.warn(e);
    }
  };

  /* BackButton  */

  async function previousSong() {
    const currentSong = album.getCurrentSong();
    const currentTime = currentSong.now();
    const isPlaying = await currentSong.isPlaying();
    resetSong(currentSong);
    if (currentTime < 3) {
      album.selectSong(album.songSelected - 1);
    }
    const newSong = album.getCurrentSong();
    if (isPlaying) {
      playSong(newSong);
    }
    updateSongData();
  };

  async function nextSong() {
    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    resetSong(currentSong);
    album.selectSong(album.songSelected + 1);
    const newSong = album.getCurrentSong();
    if (isPlaying) {
      playSong(newSong);
    }
    updateSongData();
  };

  return {
    togglePlay,
    previousSong,
    nextSong,
    updateSongData,
    onBarClick,
    updateBarPointer
  }

});

export default mp3PlayerModule;