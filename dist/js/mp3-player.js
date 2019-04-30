import {volBtnIcon, songDataUpdate, setSongCurrentTimeOnScreen } from './abstract.js';

export const playBtn = document.getElementById("play");
export const backBtn = document.getElementById("back");
export const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
const pointer = document.querySelector('#bar-pointer');
const bar = document.querySelector('#song-bar');

export let songList = [];
export let currentSong = 1;

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
    songDataUpdate(songList[currentSong]);
    
    console.log(currentSong);
    console.log(songList[currentSong].volume);
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
        requestAnimationFrame(function(timestamp){
            starttime = timestamp || new Date().getTime();
            moveBar(timestamp, pointer, bar.clientWidth, song.duration * 1000)
        })
            
    } else {
        //action
        song.pause();
        //style
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause');
        playBtn.classList.remove("pressed");
        playBtn.classList.add('fa-play');
    }
    
}

var starttime;

function moveBar(timestamp, el, dist, duration){
    var timestamp = timestamp || new Date().getTime(); //segna il tempo iniziale
    var runtime = timestamp - starttime //quanto tempo e' passato
    var progress = (runtime / duration) * 100; //in percentuale
    el.style.left = progress + '%'; //sposta il cursore
    setSongCurrentTimeOnScreen(songList[currentSong]); //setta il tempo trascorso
    if(runtime < duration){
        requestAnimationFrame(function(timestamp){
            moveBar(timestamp, el, dist, duration);
        })
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
        
        songList.forEach( el => {
            el.volume = percentage / 100;
        })  
        console.log(songList[currentSong].volume) 

        volBtnIcon(songList[currentSong]);
}







function songCurrentTime(timestamp, song){

    setSongCurrentTimeOnScreen(song);

}


