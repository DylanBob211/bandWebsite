const menuModule = (function() {
  const threeLines = document.querySelectorAll('.line');
  const socialMenu = document.querySelector('#social');
  const hiddenMenu = document.querySelector(".menu");
  const hiddenMenuNav = document.querySelector(".menu-nav");
  const hiddenMenuLink = document.querySelectorAll(".nav-link");
  
  let menuIsShown = false;
  let openTimerID;
  let closeTimerID;

  function animateBurgerMenuOpen() {
    if (closeTimerID) {
      clearTimeout(closeTimerID);
    }
    threeLines.forEach(elem => {
      elem.classList.add('shown');
    });
    openTimerID = setTimeout(() => {
      threeLines.forEach(elem => {
        elem.classList.add('shown_second');
      });
    }, 500);
  }

  function animateBurgerMenuClose() {
    if (openTimerID) {
      clearTimeout(openTimerID); // TODO: fix-bug 
    }
    threeLines.forEach(elem => {
      elem.classList.remove('shown_second');
    });
    openTimerID = setTimeout(() => {
      threeLines.forEach(elem => {
        elem.classList.remove('shown');
      });
    }, 500);
  }

  function openNavMenu() {
    hiddenMenuNav.classList.add('shown');
    hiddenMenuLink.forEach(elem => {
      elem.classList.add('shown');
    })
  }

  function closeNavMenu() {
    hiddenMenuNav.classList.remove('shown');
    hiddenMenuLink.forEach(elem => {
      elem.classList.remove('shown');
    })
  }
  
  function toggleMenu() {
    if(!menuIsShown){  
      animateBurgerMenuOpen();
      openNavMenu();
      menuIsShown = true;
    } else {
      animateBurgerMenuClose();
      closeNavMenu();
      menuIsShown = false;
    }
  }

  return {
    toggleMenu
  }
})()

export default menuModule;