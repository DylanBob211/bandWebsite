const contact = (function() {
  function init() {
    document.querySelector('#contact').addEventListener('click', toggleContact);
  }

  function toggleContact() {
    const contactBox = document.querySelector('#contact-box');
    if (!contactBox.classList.contains('shown')) {
      contactBox.classList.add('shown');
    } else {
      contactBox.classList.remove('shown');
    }
  }

  return {
    init
  }
})()

export default contact;
