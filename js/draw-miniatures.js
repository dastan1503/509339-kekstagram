'use strict';
window.drawMiniatures = (function (blocks) {
  // отрисовка миниатюр
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var blocksSort = blocks.slice(0, blocks.length);
  var pictureContainer = document.querySelector('.pictures');

  var drawPicture = function (blocksArr) {
    for (var j = 0; j < blocksArr.length; j++) {
      var pictureBlock = pictureTemplate.cloneNode(true);
      pictureBlock.querySelector('.picture__img').src = blocksArr[j].url;
      pictureBlock.querySelector('.picture__likes').textContent = blocksArr[j].likes;
      pictureBlock.querySelector('.picture__comments').textContent = blocksArr[j].comments.length;
      fragment.appendChild(pictureBlock);
    }
    pictureContainer.appendChild(fragment);
    window.openClosePopup(blocksArr);
  };
  drawPicture(blocks);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var buttonNew = document.querySelector('#filter-new');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonDiscussed = document.querySelector('#filter-discussed');

  buttonPopular.addEventListener('click', function () {
    var buttonActive = document.querySelector('.img-filters__button--active');
    buttonActive.classList.remove('img-filters__button--active');
    buttonPopular.classList.add('img-filters__button--active');
    var pic = document.querySelectorAll('.picture');
    pic.forEach(function (element) {
      pictureContainer.removeChild(element);
    });
    drawPicture(blocks);
  });

  buttonNew.addEventListener('click', function () {
    var blocksWork = blocks.slice(0, blocks.length);
    var buttonActive = document.querySelector('.img-filters__button--active');
    buttonActive.classList.remove('img-filters__button--active');
    buttonNew.classList.add('img-filters__button--active');
    var pic = document.querySelectorAll('.picture');
    pic.forEach(function (element) {
      pictureContainer.removeChild(element);
    });

    for (var j = blocksWork.length - 1; j > 0; j--) {
      var rand = Math.floor(Math.random() * (j + 1));
      var temp = blocksWork[j];
      blocksWork[j] = blocksWork[rand];
      blocksWork[rand] = temp;
    }
    blocksWork = blocksWork.slice(0, 10);
    drawPicture(blocksWork);
  });

  buttonDiscussed.addEventListener('click', function () {
    var blocksWork = blocks.slice(0, blocks.length);
    var buttonActive = document.querySelector('.img-filters__button--active');
    buttonActive.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.add('img-filters__button--active');
    var pic = document.querySelectorAll('.picture');
    pic.forEach(function (element) {
      pictureContainer.removeChild(element);
    });

    var sorting = function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return 0;
      }
    };

    blocksWork = blocksWork.sort(sorting);
    drawPicture(blocksWork);
  });

  return blocksSort;
});
