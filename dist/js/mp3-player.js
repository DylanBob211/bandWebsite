import {removeLastFaToken} from './abstract.js';

export const playBtn = document.getElementById("play");
export const backBtn = document.getElementById("back");
export const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
export const volBtn = document.getElementById("volume");

export let songList = [];
let currentSong = 2;

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
    console.log(currentSong)
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
    console.log(currentSong)
}

//play/pause button

export function toggleSong() {
    if(songList[currentSong].paused){
        //action
        console.log(songList[currentSong].duration);
        songList[currentSong].play();
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


//da fare
//volume up-down


function volBtnIcon(song){
    if(song.volume == 0){
        volBtn.classList.add('fa-volume-off')
        removeLastFaToken(volBtn);
    } else if(song.volume <= 0.5){
        volBtn.classList.add('fa-volume-down')
        removeLastFaToken(volBtn);
    } else if(song.volume > 1.0){
        volBtn.classList.add('fa-volume-up')
        removeLastFaToken(volBtn);
    }
}



//volume muted
//volBtn.addEventListener('click', toggleVolume);


/*function toggleVolume(){
    if(!volBtnIsPressed){

        removeLastFaToken(volBtn);
        volBtn.classList.add('fa-volume-mute');
        volBtnIsPressed = true;
    } else {
        volBtn.classList.remove('fa-volume-mute');

        volBtnIsPressed = false;
    }
}*/
