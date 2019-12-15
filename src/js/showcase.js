const showcase = (function() {
  const bgShowcase = document.querySelector('#logo');
  const arrow = document.querySelector('#arrow i');
  const imgPaths = [
    './src/assets/imgs/logo.png',
    './src/assets/imgs/band-photo/alpha-band.webp',
    './src/assets/imgs/band-photo/band1.webp',
    './src/assets/imgs/band-photo/drummer.webp',
    './src/assets/imgs/band-photo/guitarist.webp',
    './src/assets/imgs/band-photo/mixer.webp',
    './src/assets/imgs/band-photo/piano-girl.webp'
  ];
  const lipsumTitle = [
    '',
    'Lorem Ipsum',
    'Incididunt qui laborum',
    'Ex do proident',
    'Laborum voluptate',
    'Ora pro nobis',
    'In aliqua dolor enim'
  ];
  const lipsumTexts = [
    '',
    'Consequat enim adipisicing et qui cupidatat voluptate est et velit non dolore nulla sint deserunt. Non anim magna sunt do duis magna voluptate elit labore. Ad officia cillum nostrud deserunt. Nostrud proident velit adipisicing voluptate qui id aliquip sunt. Dolore laborum eu veniam minim culpa commodo veniam anim id occaecat cupidatat voluptate aute. Magna consequat eu tempor Lorem laboris dolore sunt eu tempor sit. Enim adipisicing sunt cupidatat proident anim deserunt qui aute velit dolore adipisicing.',
    'Amet aute nisi ad dolor id non magna commodo in tempor ex anim ad. Voluptate aute reprehenderit adipisicing aliqua. Laboris consectetur qui ullamco do nisi tempor quis deserunt non aliquip excepteur ut.',
    'Reprehenderit ut culpa excepteur et laboris aute nulla ut. Cillum non aliqua sit adipisicing id excepteur consequat minim tempor amet laborum proident. Lorem mollit consequat aliqua culpa officia ex est dolor consectetur non. Et fugiat sint aute irure consectetur excepteur ullamco duis incididunt labore adipisicing mollit irure. Consectetur ullamco officia cupidatat laboris sit.',
    'Do ea veniam ipsum velit ut ipsum. Cupidatat minim occaecat Lorem consequat do irure pariatur. Aute consectetur magna laboris et eu nulla.',
    'Nulla ad adipisicing sit cupidatat ea fugiat exercitation et do consectetur. Labore non sint fugiat irure cillum officia anim laborum dolore culpa sint sunt nisi. Qui nisi commodo laboris excepteur id magna qui labore. Est magna dolore et aliquip nulla cillum aliqua nisi exercitation anim. Dolor veniam pariatur consectetur aliqua nostrud do aute minim id ex. Magna non velit id adipisicing in occaecat non do ea nisi culpa. Sunt velit aute ad amet aliqua.',
    'Ullamco consectetur non amet velit ea exercitation duis ut qui sint dolore esse sunt anim. Anim irure incididunt minim amet duis do cupidatat pariatur proident incididunt excepteur ex esse culpa. Non commodo anim dolor culpa veniam. Nulla tempor reprehenderit eiusmod proident exercitation reprehenderit ipsum dolor sunt aliqua. Mollit sint incididunt culpa irure veniam ex nisi consequat.',
  ];
  let elementSelectors = []
  let selectedImgIndex = 0;
  let intervalID;

  function init() {
    createSelectors();
    autoChange();
    setTimeout(showArrow, 5000);
    arrow.addEventListener('click', hideArrow);
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
    selectText(selectedImgIndex);
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
    selectText(index);
  }

  function selectText(index) {
    const textbox = document.querySelector('#showcase-text');
    const header = textbox.querySelector('h1');
    const p = textbox.querySelector('p');
    header.innerHTML = lipsumTitle[index];
    p.innerHTML = lipsumTexts[index];
  }

  function changeImage(index) {
    if (index === 0) {
      bgShowcase.style.backgroundSize = 'contain';
    } else {
      bgShowcase.style.backgroundSize = 'cover';
    }
    bgShowcase.style.backgroundImage = `url(${imgPaths[index]})`;
  }

  function autoChange() {
    intervalID = setInterval(next, 5000)
  }

  function showArrow() {
    arrow.classList.add('active');
  }

  function hideArrow() {
    arrow.classList.remove('active');
  }

  return { init }
})()

export default showcase;
