//document queries for menu
const threeLinesMenu = document.querySelector('.menu-btn');
const threeLines = document.querySelectorAll('.line');
const socialMenu = document.querySelector('#social');
const hiddenMenu = document.querySelector(".menu");
const hiddenMenuNav = document.querySelector(".menu-nav");
const hiddenMenuLink = document.querySelectorAll(".nav-link");

let menuIsShown = false;

threeLinesMenu.addEventListener("click", toggleMenu);


function toggleMenu() {
    if(!menuIsShown){

        
        threeLines.forEach(elem => {
            
            elem.classList.add("shown");
        });
        setTimeout( function() {
            threeLines.forEach( elem => {
            elem.classList.add("shown_second");
            })
        }, 500);

        hiddenMenuNav.classList.add("shown");
        hiddenMenuLink.forEach(elem => {
            elem.classList.add("shown")
        })
        menuIsShown = true;
    } else {

        setTimeout( function() {
            threeLines.forEach( elem => {
            elem.classList.remove("shown");
            })
        }, 500);

        threeLines.forEach(elem => {
            elem.classList.remove("shown_second");
        })
        
        hiddenMenuNav.classList.remove("shown");
        hiddenMenuLink.forEach(elem => {
            elem.classList.remove("shown")
        })
        menuIsShown = false;
        
    }
}

//mp3 player
const playBtn = document.getElementById("play");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const listBtn = document.getElementById("list");
const volBtn = document.getElementById("volume");

const songBar = document.getElementById("song-bar");
const pointer = songBar.querySelector('#bar-pointer');

let backBtnIsPressed = false; 
let playBtnIsPressed = false; 
let nextBtnIsPressed = false; 
let listBtnIsPressed = false; 
let volBtnIsPressed = false;

let songsSrc = []
let posters = []

let currentSong = 0;

const song = new Audio('./audio/test.mp3');


playBtn.addEventListener('click', toggleSong);
backBtn.addEventListener('click', function(){console.log("back")});
nextBtn.addEventListener('click', function(){console.log("next")});
listBtn.addEventListener('click', toggleList);

function toggleSong() {
    if(!playBtnIsPressed){
        //action
        song.play();
        //style
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        playBtn.classList.add("pressed");

        playBtnIsPressed = true;
        console.log(song);
    } else {
        //action
        song.pause();
        //style
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause');
        playBtn.classList.remove("pressed");
        playBtn.classList.add('fa-play');
        
        playBtnIsPressed = false;
    }

    
}



function toggleList(){
    let songList = document.getElementById("songlist");
    
    

    if(!listBtnIsPressed) {
        console.log(song.played.end(0))
        listBtnIsPressed = true;
    } else {
        console.log(song.played)
        listBtnIsPressed = false;
    }
}


const timePassed = document.querySelector('#song-bar');

//volume up-down

volBtn.addEventListener('mouseover', event => {
    
})

function volBtnIcon(){
    if(song.volume == 0){
        volBtn.classList.add('fa-volume-off')
        removeLastToken(volBtn);
    } else if(song.volume <= 0.5){
        volBtn.classList.add('fa-volume-down')
        removeLastToken(volBtn);
    } else if(song.volume > 1.0){
        volBtn.classList.add('fa-volume-up')
        removeLastToken(volBtn);
    }
}


//volume muted
volBtn.addEventListener('click', toggleVolume);


function toggleVolume(){
    if(!volBtnIsPressed){

        removeLastToken(volBtn);
        volBtn.classList.add('fa-volume-mute');
        volBtnIsPressed = true;
    } else {
        volBtn.classList.remove('fa-volume-mute');
        
        volBtnIsPressed = false;
    }
}

function removeLastToken(btn){
    btn.classList.forEach( el => {
        if(el === "fa" || el === "mp3-btns"){
            return true;
        } else {
            btn.classList.remove(el);
        }
    })
}