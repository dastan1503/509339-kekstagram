'use strict';
window.drawMiniatures = (function (blocks) {
  // отрисовка миниатюр
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var blocksSort = blocks.slice(0, blocks.length);
  var pictureContainer = document.querySelector('.pictures');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  filterButtons.forEach(function (element) {
    element.tabindex = '0';
  });

  var drawPicture = function (blocksArr) {
    blocksArr.forEach(function (element) {
      var pictureBlock = pictureTemplate.cloneNode(true);
      pictureBlock.querySelector('.picture__img').src = element.url;
      pictureBlock.querySelector('.picture__likes').textContent = element.likes;
      pictureBlock.querySelector('.picture__comments').textContent = element.comments.length;
      fragment.appendChild(pictureBlock);
    });
    pictureContainer.appendChild(fragment);
    window.openClosePopup(blocksArr);
  };
  drawPicture(blocks);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  var buttonNew = document.querySelector('#filter-new');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonDiscussed = document.querySelector('#filter-discussed');
  var lastTimeout;
  var timeout = 500;

  var drawAfterTime = function (array) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      var pic = document.querySelectorAll('.picture');
      pic.forEach(function (element) {
        pictureContainer.removeChild(element);
      });
      drawPicture(array);
    }, timeout);
  };

  var changeActiveButton = function () {
    var buttonActive = document.querySelector('.img-filters__button--active');
    buttonActive.classList.remove('img-filters__button--active');
  };

  buttonPopular.addEventListener('click', function () {
    changeActiveButton();
    buttonPopular.classList.add('img-filters__button--active');
    drawAfterTime(blocks);
  });

  buttonNew.addEventListener('click', function () {
    var blocksWork = blocks.slice(0, blocks.length);
    var countNewPicture = 10;
    changeActiveButton();
    buttonNew.classList.add('img-filters__button--active');

    for (var j = blocksWork.length - 1; j > 0; j--) {
      var rand = Math.floor(Math.random() * (j + 1));
      var temp = blocksWork[j];
      blocksWork[j] = blocksWork[rand];
      blocksWork[rand] = temp;
    }
    blocksWork = blocksWork.slice(0, countNewPicture);
    drawAfterTime(blocksWork);
  });

  buttonDiscussed.addEventListener('click', function () {
    var blocksWork = blocks.slice(0, blocks.length);
    changeActiveButton();
    buttonDiscussed.classList.add('img-filters__button--active');

    var sorting = function (a, b) {
      if (a.comments.length === b.comments.length) {
        return 0;
      }
      return a.comments.length < b.comments.length ? 1 : -1;
    };

    blocksWork = blocksWork.sort(sorting);
    drawAfterTime(blocksWork);
  });

  return blocksSort;
});
