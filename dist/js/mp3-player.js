import {volBtnIcon, songDataUpdate, setSongCurrentTimeOnScreen } from './abstract.js';
import { Song } from './songs.js'

export const playBtn = document.getElementById("play");
export const backBtn = document.getElementById("back");
export const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
const pointer = document.querySelector('#bar-pointer');
export const bar = document.querySelector('#song-bar');

export let songList = [];
export let currentSong = 2;
//canzoni nella cartella audio
const tiktok = new Song('Tik Tok', 'Kesha', './audio/Kesha-TiK ToK.mp3');
const test = new Song('Russian', 'rusfolks', './audio/test.mp3');
const evans = new Song('Spartacus Love Theme', 'Bill Evans', './audio/Spartacus Love Theme - Bill Evans Solo.mp3');

//aggiunte alla tracklist
tiktok.addToTracklist(songList);
test.addToTracklist(songList);
evans.addToTracklist(songList);

var starttime;
//back button
export function prevSong(){

    cancelAnimationFrame(requestMovebarAnimationReference)
    pointer.style.left = 0;
    //resent old data
    songList[currentSong].currentTime = 0;

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
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, songList[currentSong])
        })
    }
    //update newdata
    songDataUpdate(songList[currentSong]);
    
    console.log(currentSong);
    console.log(songList[currentSong].volume);
}

//next button
export function nextSong(){
    cancelAnimationFrame(requestMovebarAnimationReference);

    pointer.style.left = 0;
    //resent old data
    songList[currentSong].currentTime = 0;

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
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, songList[currentSong])
        })
    }
    songDataUpdate(songList[currentSong]);
    
    console.log(currentSong);
    console.log(songList[currentSong].volume);
}

//play/pause button
export function toggleSong(song) {
    if(song.paused){
        //action
        console.log(song.duration);
        song.play();
        //style
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        playBtn.classList.add("pressed");
        //start bar animation
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, song)
        })
            
    } else {
        //action
        song.pause();
        //style
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause');
        playBtn.classList.remove("pressed");
        playBtn.classList.add('fa-play');
        //stop animation

    }
    
}

//bar moving on play animation
var requestMovebarAnimationReference;

function moveBar(timestamp, el, dist, song){

    var timestamp = timestamp || new Date().getTime(); //segna il tempo iniziale
    var progress = (song.currentTime / song.duration) * 100; //in percentuale
    
    console.log(`progress: ${progress}`)

    el.style.left = progress + '%'; //sposta il cursore
    setSongCurrentTimeOnScreen(songList[currentSong]); //setta il tempo trascorso
    if(song.currentTime < song.duration && !song.paused){
        requestMovebarAnimationReference = requestAnimationFrame(function(timestamp){
            moveBar(timestamp, el, dist, song);
        })
        console.log(requestMovebarAnimationReference)
    }
}

//volume regulation
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
        
        songList.forEach( el => {
            el.volume = percentage / 100;
        })  
        console.log(songList[currentSong].volume) 

        volBtnIcon(songList[currentSong]);
}

export function updateSongBar(x, currenttime){
    let songBar = bar;
    var percentage;
    if(currenttime){
        percentage = currrenttime * 100;
    } else {
        var position = x - songBar.offsetLeft;
        percentage = 100 * position / songBar.clientWidth;
    }
    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }
    pointer.style.left = percentage + "%";
    songList[currentSong].currentTime = percentage / 100 * songList[currentSong].duration;
    setSongCurrentTimeOnScreen(songList[currentSong]);
    cancelAnimationFrame(requestMovebarAnimationReference);
    
}   

