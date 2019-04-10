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

const songBar = document.getElementById("song-bar");
const pointer = songBar.querySelector('#bar-pointer');

let backBtnIsPressed = false; //0
let playBtnIsPressed = false; //1
let nextBtnIsPressed = false; //2
let listBtnIsPressed = false; //3

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
        printListOnImageframe();
        listBtnIsPressed = true;
    } else {
        printListOnImageframe();
        listBtnIsPressed = false;
    }
}

