'use strict';
(window.drawMiniatures = function () {
  // отрисовка миниатюр
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var blocksArr = window.generateBlocks();
  for (var j = 0; j < blocksArr.length; j++) {
    var pictureBlock = pictureTemplate.cloneNode(true);
    pictureBlock.querySelector('.picture__img').src = blocksArr[j].url;
    pictureBlock.querySelector('.picture__img').dataset.text = blocksArr[j].description;
    pictureBlock.querySelector('.picture__likes').textContent = blocksArr[j].likes;
    pictureBlock.querySelector('.picture__comments').textContent = blocksArr[j].comments.length;
    for (var k = 0; k < blocksArr[j].comments.length; k++) {
      pictureBlock.querySelector('.picture__comments').dataset[k] = blocksArr[j].comments[k];
    }

    fragment.appendChild(pictureBlock);
  }
  var pictureContainer = document.querySelector('.pictures');
  pictureContainer.appendChild(fragment);
  return blocksArr;
})();
