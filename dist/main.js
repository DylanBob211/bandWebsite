'use howler'
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
const mp3Btns = document.querySelectorAll('.mp3_btns');
let playBtnIsPressed = false;
let mp3_btnIsPressed = false;

const song = new Howl({
    src: './audio/test.mp3'    
})

playBtn.addEventListener('click', toggleSong);

function toggleSong() {
    if(!playBtnIsPressed){
        //song.play();
        playBtn.classList.remove('fa-play')
        playBtn.classList.add('fa-pause')
        playBtn.classList.add("pressed");
        playBtnIsPressed = true;
    } else {
        //song.stop();
        playBtn.classList.remove('pressed')
        playBtn.classList.remove('fa-pause')
        playBtn.classList.add('fa-play');
        playBtnIsPressed = false;
    }

    
}
// risolvi la questione dei tasti. Fai uno switch sui 3/4 tasti
function toggleBtns(){
    if(!btnIsPressed) {
        
    }
}

