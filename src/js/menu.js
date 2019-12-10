const menuModule = (function() {
  const threeLinesMenu = document.querySelector('.menu-btn');
  const fixedNavBar = document.querySelector('#fixed-nav-bar');
  const threeLines = document.querySelectorAll('.line');
  const socialMenu = document.querySelector('#social');
  const hiddenMenu = document.querySelector(".menu");
  const hiddenMenuNav = document.querySelector(".menu-nav");
  const hiddenMenuLink = document.querySelectorAll(".nav-link");
  
  let menuIsShown = false;
  let lastScrollTop = 0;
  let openTimerID;
  let closeTimerID;

  function init() {
    threeLinesMenu.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        console.log('down')
        hideNavBar()        
      } else {
        console.log('up')
        showNavBar()
      }
      lastScrollTop = st <= 0 ? 0 : st    
    });
  }

  function hideNavBar() {
    if (!fixedNavBar.classList.contains('hidden')) 
    fixedNavBar.classList.add('hidden');
  }

  function showNavBar() {
    if (fixedNavBar.classList.contains('hidden'))
    fixedNavBar.classList.remove('hidden');
  }

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
    init
  }
})()

export default menuModule;