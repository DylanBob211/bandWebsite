const mp3PlayerModule = (function(album) {
  const playBtn = document.getElementById("play");
  const backBtn = document.getElementById("back");
  const nextBtn = document.getElementById("next");

  const listBtn = document.getElementById("list");
  const volBtn = document.querySelector('#volume');
  const barPointer = document.querySelector('#bar-pointer');
  const barSeeker = document.querySelector('#song-bar');

  let moveBarAnimationID;
  let startTime;
  function moveSongBarSeeker(timestamp, barPointer, dist, song){
    let timeImpression = timestamp || new Date().getTime(); //segna il tempo iniziale
    let progress = (song.currentTime / song.duration) * 100; //in percentuale

    barPointer.style.left = progress + '%'; //sposta il cursore
    if (song.currentTime < song.duration && !song.paused) {
        moveBarAnimationID = requestAnimationFrame(timestamp => {
            moveSongBarSeeker(timeImpression, barPointer, dist, song);
        });
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
        })
        playButtonClickAnimation(isPaused);
      } else {
        currentSong.pause();
        playButtonClickAnimation(isPaused);
        cancelAnimationFrame(moveBarAnimationID);
      } 
      return isPaused;
    } catch(e) {
      console.log(e);
    }
  };

  /* BackButton  */

  async function previousSong() {
    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    const currentTime = currentSong.now();
    currentSong.stop();
    if (currentTime < 3) {
      album.selectSong(album.songSelected - 1);
    }
    console.log(currentSong.currentTime);
    const newSong = album.getCurrentSong();
    if (isPlaying) newSong.play();
  };

  async function nextSong() {
    const currentSong = album.getCurrentSong();
    const isPlaying = await currentSong.isPlaying();
    currentSong.stop();
    album.selectSong(album.songSelected + 1);
    const newSong = album.getCurrentSong();
    if (isPlaying) newSong.play();
  };

  return {
    togglePlay,
    previousSong,
    nextSong
  }

});

export default mp3PlayerModule;