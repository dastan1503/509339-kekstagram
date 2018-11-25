'use strict';

var descriptionsArr = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var commentsSource = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var countOfPicture = 25;
var generatedPictureBlocks = [];
var generateBlocks = function () {

  // формирование массива с комментариями
  var generateComments = function () {
    var commentsArr = [];
    commentsArr.length = Math.floor(Math.random() * 10);
    for (var i = 0; i < commentsArr.length; i++) {
      commentsArr[i] = commentsSource[Math.floor(Math.random() * commentsSource.length)];
    }
    return commentsArr;
  };

  // рандомизация массива с 1 до 25
  var arr = [];
  for (var i = 0; i < countOfPicture; i++) {
    arr[i] = i + 1;
  }

  for (var j = arr.length - 1; j > 0; j--) {
    var rand = Math.floor(Math.random() * (j + 1));
    var temp = arr[j];
    arr[j] = arr[rand];
    arr[rand] = temp;
  }

  // создание 25 объектов с заданными свойствами
  for (var k = 0; k < countOfPicture; k++) {
    generatedPictureBlocks[k] = {
      url: 'photos/' + arr[k] + '.jpg',
      likes: Math.floor(Math.random() * 185) + 15,
      comments: generateComments(),
      description: descriptionsArr[Math.floor(Math.random() * (descriptionsArr.length - 1))]
    };
  }
  return generatedPictureBlocks;
};

generateBlocks();

// отрисовка миниатюр
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var fragment = document.createDocumentFragment();
for (var j = 0; j < generatedPictureBlocks.length; j++) {
  var pictureBlock = pictureTemplate.cloneNode(true);
  pictureBlock.querySelector('.picture__img').src = generatedPictureBlocks[j].url;
  pictureBlock.querySelector('.picture__likes').textContent = generatedPictureBlocks[j].likes;
  pictureBlock.querySelector('.picture__comments').textContent = generatedPictureBlocks[j].comments.length;
  fragment.appendChild(pictureBlock);
}
var pictureContainer = document.querySelector('.pictures');
pictureContainer.appendChild(fragment);

// формирование большого блока с изображением

var pictureBig = document.querySelector('.big-picture');
pictureBig.classList.remove('hidden');
pictureBig.querySelector('.big-picture__img img').src = generatedPictureBlocks[0].url;
pictureBig.querySelector('.likes-count').textContent = generatedPictureBlocks[0].likes;
pictureBig.querySelector('.comments-count').textContent = generatedPictureBlocks[0].comments.length;
pictureBig.querySelector('.social__caption').textContent = generatedPictureBlocks[0].description;
// переиспользуем существующий блок комментария
var commentBlock = document.querySelector('.social__comment');
// удаляем существующие в разметке комментарии
while (document.querySelector('.social__comments').firstChild) {
  document.querySelector('.social__comments').removeChild(document.querySelector('.social__comments').firstChild);
}
// отрисовываем сгенерированные комментарии
fragment = document.createDocumentFragment();
for (var i = 0; i < generatedPictureBlocks[0].comments.length; i++) {
  commentBlock.querySelector('img').src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
  commentBlock.querySelector('.social__text').textContent = generatedPictureBlocks[0].comments[i];
  fragment.appendChild(commentBlock.cloneNode(true));
}
document.querySelector('.social__comments').appendChild(fragment);

// скрываем ненужные детали
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
