import Menu from './menu.js';
import Mp3Player from './mp3_player.js';
import Showcase from './showcase.js';
import Contact from './contact.js';

document.querySelector('body').onload = function(ev) {
  Mp3Player.init();
  Contact.init();
  Showcase.init();
  Menu.init();
}

//scroll into view

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

