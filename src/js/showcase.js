const showcase = (function() {
  const bgShowcase = document.querySelector('#logo');
  const imgPaths = [
    './src/imgs/logo.png',
    './src/imgs/band-photo/alpha-band.webp',
    './src/imgs/band-photo/band1.webp',
    './src/imgs/band-photo/drummer.webp',
    './src/imgs/band-photo/guitarist.webp',
    './src/imgs/band-photo/mixer.webp',
    './src/imgs/band-photo/piano-girl.webp'
  ]
  let elementSelectors = []
  let selectedImgIndex = 0;
  let intervalID;

  function init() {
    createSelectors();
    autoChange();
  }

  function createSelectors() {
    imgPaths.forEach((element, index) => {
      let imgSelector = document.createElement('div');
      imgSelector.classList.add('carousel_button');
      if (index === 0) {
        imgSelector.classList.add('active')
      }
      elementSelectors.push(imgSelector);
      document.querySelector('.selector-box').appendChild(imgSelector);
      imgSelector.addEventListener('click', () => {
        selectImage(index);
      })
    });
  }

  function next() {
    selectedImgIndex++
    if(selectedImgIndex > imgPaths.length - 1) selectedImgIndex = 0;
    changeImage(selectedImgIndex);
    selectSelector(selectedImgIndex);
  }

  function selectSelector(index) {
    elementSelectors.forEach(element => {
      element.classList.remove('active');
    });
    elementSelectors[index].classList.add('active');
  }

  function selectImage(index) {
    clearInterval(intervalID);
    selectedImgIndex = index;
    selectSelector(index);
    changeImage(index);
    autoChange();
  }

  function changeImage(index) {
    bgShowcase.style.backgroundImage = `url(${imgPaths[index]})`;
  }

  function autoChange() {
    intervalID = setInterval(next, 5000)
  }

  return { init }
})()

export default showcase;
