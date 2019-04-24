import {volBtnIcon, updateSongDuration} from './abstract.js';

export const playBtn = document.getElementById("play");
export const backBtn = document.getElementById("back");
export const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");


export let songList = [];
export let currentSong = 0;

// songList[currentSong] e' la canzone caricata sull'mp3
//back button
export function prevSong(){
    if(songList[currentSong].paused){
        
        currentSong--;
        if(currentSong < 0){
            currentSong = 0;
        }    
    } else {
        
        songList[currentSong].stop();
        currentSong--;
        if(currentSong < 0){
            currentSong = 0;
        }
        songList[currentSong].play();
    }
    updateSongDuration(songList[currentSong]);
    console.log(songList[currentSong]);
}

//next button
export function nextSong(){
    if(songList[currentSong].paused){
        
        currentSong++;
        if(currentSong > songList.length - 1){
            currentSong = 0;
        }    
    } else {
        
        songList[currentSong].stop();
        currentSong++;
        if(currentSong > songList.length - 1){
            currentSong = 0;
        }
        songList[currentSong].play();
    }
    updateSongDuration(songList[currentSong]);
    console.log(songList[currentSong]);
}

//play/pause button

export function toggleSong() {
    if(songList[currentSong].paused){
        //action
        console.log(songList[currentSong].duration);
        songList[currentSong].play();
        updateSongd
        //style
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        playBtn.classList.add("pressed");

    } else {
        //action
        songList[currentSong].pause();
        //style
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause');
        playBtn.classList.remove("pressed");
        playBtn.classList.add('fa-play');
        
    }
}







export const volumeOuter = document.querySelector('#outer-slider');

export function updateVolBar(x, vol){
    
    const volumeInner = document.querySelector('#inner-slider');
    
    let volume = volumeOuter;
    let list = listBtn;
    var percentage;
        //if only volume have specificed
        //then direct update volume
        if (vol) {
            percentage = vol * 100;
        } else {
            var position = x - volume.offsetLeft - (list.clientWidth / 2);
            percentage = 100 * position / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }
        volumeInner.style.width = percentage + "%";
        songList[currentSong].volume = percentage / 100;

        volBtnIcon(songList[currentSong]);
}

