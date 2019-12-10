const gallery = (function() {
  const bgShowcase = document.querySelector('#logo');
  const elementSelectors = []
  const imgs = bgShowcase.querySelectorAll('img');
  let selectedImgIndex = 0;
  let intervalID;

  function initShowcase() {
    imgs.forEach((element, index) => {
      let imgSelector = document.createElement('div');
      imgSelector.classList.add('carousel_button');
      if (index === 0) {
        imgSelector.classList.add('active')
      }
      elementSelectors.push(imgSelector);
      document.querySelector('.selector-box').appendChild(imgSelector);
      imgSelector.addEventListener('click', () => {
        selectImg(index);
      })
    });
    autoScroll();
  }

  function next() {
    selectedImgIndex++
    if(selectedImgIndex > imgs.length - 1) selectedImgIndex = 0;
    setTranslateX(selectedImgIndex);
    selectSelector(selectedImgIndex);
  }

  function autoScroll() {
    intervalID = setInterval(next, 5000)
  }

  function selectImg(index) {
    clearInterval(intervalID);
    selectedImgIndex = index;
    setTranslateX(index);
    selectSelector(index);
    autoScroll();
  }

  function selectSelector(index) {
    elementSelectors.forEach(element => {
      element.classList.remove('active');
    });
    elementSelectors[index].classList.add('active');
  }

  function setTranslateX(index) {
    imgs.forEach(element => {
      element.style.transform = `translateX(${index * -100}%)`
    })
  }

  return {
    initShowcase,
  }
  
})()

export default gallery;