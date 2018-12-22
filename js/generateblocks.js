'use strict';
(window.generateBlocks = function () {
  // формирование массива с комментариями
  var generateComments = function () {
    var commentsArr = [];
    commentsArr.length = Math.floor(Math.random() * 10);
    for (var i = 0; i < commentsArr.length; i++) {
      commentsArr[i] = window.data().source.commentsSource[Math.floor(Math.random() * window.data().source.commentsSource.length)];
    }
    return commentsArr;
  };

  // рандомизация массива с 1 до 25
  var arr = [];
  for (var i = 0; i < window.data().other.PICTURE_COUNT; i++) {
    arr[i] = i + 1;
  }

  for (var j = arr.length - 1; j > 0; j--) {
    var rand = Math.floor(Math.random() * (j + 1));
    var temp = arr[j];
    arr[j] = arr[rand];
    arr[rand] = temp;
  }

  // создание 25 объектов с заданными свойствами
  var generatedPictureBlocks = [];

  for (var k = 0; k < window.data().other.PICTURE_COUNT; k++) {
    generatedPictureBlocks[k] = {
      url: 'photos/' + arr[k] + '.jpg',
      likes: Math.floor(Math.random() * 185) + 15,
      comments: generateComments(),
      description: window.data().source.descriptionsArr[Math.floor(Math.random() * (window.data().source.descriptionsArr.length - 1))]
    };
  }
  return generatedPictureBlocks;
})();
