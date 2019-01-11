'use strict';
window.drawMiniatures = (function (blocks) {
  // отрисовка миниатюр
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var blocksArr = blocks;
  for (var j = 0; j < blocksArr.length; j++) {
    var pictureBlock = pictureTemplate.cloneNode(true);
    pictureBlock.querySelector('.picture__img').src = blocksArr[j].url;
    pictureBlock.querySelector('.picture__likes').textContent = blocksArr[j].likes;
    pictureBlock.querySelector('.picture__comments').textContent = blocksArr[j].comments.length;
    fragment.appendChild(pictureBlock);
  }
  var pictureContainer = document.querySelector('.pictures');
  pictureContainer.appendChild(fragment);
  window.openClosePopup(blocksArr);
  return blocksArr;
});