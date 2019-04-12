const threeLines = document.querySelectorAll('.line');
const socialMenu = document.querySelector('#social');
const hiddenMenu = document.querySelector(".menu");
const hiddenMenuNav = document.querySelector(".menu-nav");
const hiddenMenuLink = document.querySelectorAll(".nav-link");

let menuIsShown = false;

export function toggleMenu() {
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