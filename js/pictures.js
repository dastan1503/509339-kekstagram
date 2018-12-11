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
var PICTURE_COUNT = 25;
var generatedPictureBlocks = [];
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;
var inputHashtags = document.querySelector('.text__hashtags');
var inputDescription = document.querySelector('.text__description');
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
  for (var i = 0; i < PICTURE_COUNT; i++) {
    arr[i] = i + 1;
  }

  for (var j = arr.length - 1; j > 0; j--) {
    var rand = Math.floor(Math.random() * (j + 1));
    var temp = arr[j];
    arr[j] = arr[rand];
    arr[rand] = temp;
  }

  // создание 25 объектов с заданными свойствами
  for (var k = 0; k < PICTURE_COUNT; k++) {
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
var drawMiniatures = function () {
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
};
drawMiniatures();

// скрываем ненужные детали
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

// открытие/закрытие большого фото
var switchFullPhoto = function () {
  var pictureMin = document.querySelectorAll('.picture');
  var pictureBig = document.querySelector('.big-picture');
  var closeButton = document.querySelector('.big-picture__cancel');

  var showPictureBig = function (num) {
    var openPopupPictureBig = function () {
      pictureBig.classList.remove('hidden');
      drawFullPicture(generatedPictureBlocks[num]);
      closePopup(closeButton, pictureBig);
    };

    pictureMin[num].addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE_ENTER) {
        openPopupPictureBig();
      }
    });

    pictureMin[num].addEventListener('click', function () {
      openPopupPictureBig();
    });
  };

  for (var i = 0; i < pictureMin.length; i++) {
    showPictureBig(i);
  }

  var drawFullPicture = function (picture) {
    // формирование большого блока с изображением
    pictureBig.querySelector('.big-picture__img img').src = picture.url;
    pictureBig.querySelector('.likes-count').textContent = picture.likes;
    pictureBig.querySelector('.comments-count').textContent = picture.comments.length;
    pictureBig.querySelector('.social__caption').textContent = picture.description;
    // переиспользуем существующий блок комментария
    var commentBlock = document.querySelector('.social__comment');
    // удаляем существующие в разметке комментарии
    var commentsContainer = document.querySelector('.social__comments');
    while (commentsContainer.firstChild) {
      commentsContainer.removeChild(commentsContainer.firstChild);
    }
    // отрисовываем сгенерированные комментарии
    var fragment = document.createDocumentFragment();
    for (i = 0; i < picture.comments.length; i++) {
      var commentTemplate = commentBlock.cloneNode(true);
      commentTemplate.querySelector('img').src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
      commentTemplate.querySelector('.social__text').textContent = picture.comments[i];
      fragment.appendChild(commentTemplate);
    }
    commentsContainer.appendChild(fragment);
  };
};
switchFullPhoto();

// функция закрытия окна
var closePopup = function (button, PopupName) {
  var closeWindow = function () {
    PopupName.classList.add('hidden');
    document.removeEventListener('keydown', closePopupEsc);
  };

  var closePopupEsc = function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE_ESC && document.activeElement !== inputDescription && document.activeElement !== inputHashtags) {
        closeWindow();
      }
    });
  };

  var closePopupEnter = function () {
    button.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEYCODE_ENTER) {
        closeWindow();
      }
    });
  };
  var closeClick = function () {
    button.addEventListener('click', function () {
      closeWindow();
    });
  };
  closePopupEsc();
  closePopupEnter();
  closeClick();
};

// открытие\закрытие окна редактирования фото
var switchEditPhotoPopup = function () {
  var uploadFile = document.getElementById('upload-file');
  var editImgwindow = document.querySelector('.img-upload__overlay');
  var closeButton = document.querySelector('.img-upload__cancel');
  uploadFile.addEventListener('change', function () {
    editImgwindow.classList.remove('hidden');
    closePopup(closeButton, editImgwindow);
    uploadFile.value = '';
  });
};
switchEditPhotoPopup();

// изменение масштаба фото
var editScalePhoto = function () {
  var minValue = 25;
  var maxValue = 100;
  var stepValue = 25;
  var value = maxValue;
  var textControlValue = document.querySelector('.scale__control--value');
  var shiftUp = document.querySelector('.scale__control--bigger');
  var shiftDown = document.querySelector('.scale__control--smaller');

  var textValue = function () {
    textControlValue.value = value + '%';
  };

  textValue();

  var scalable = function () {
    document.querySelector('.img-upload__preview').style.transform = 'scale(' + value / 100 + ')';
  };

  shiftUp.addEventListener('click', function () {
    value = value + stepValue;
    if (value >= maxValue) {
      value = maxValue;
    }
    textValue();
    scalable();
  });
  shiftDown.addEventListener('click', function () {
    value = value - stepValue;
    if (value <= minValue) {
      value = minValue;
    }
    textValue();
    scalable();
  });

  textControlValue.addEventListener('focus', function () {
    textControlValue.value = value;
  });
  textControlValue.addEventListener('blur', function () {
    textControlValue.value = value + '%';
  });

  textControlValue.addEventListener('change', function () {
    textControlValue.value = parseInt(textControlValue.value, 10);
    if (textControlValue.value === 'NaN' || textControlValue.value > maxValue || textControlValue.value < minValue) {
      textControlValue.value = maxValue;
    }
    value = textControlValue.value;
    scalable();
  });
};
editScalePhoto();

// переключение эффекта
var switchEffectType = function () {
  var effectItem = document.querySelectorAll('.effects__item');
  var pictureSource = document.querySelector('.img-upload__preview');
  var effectRange = document.querySelector('.img-upload__effect-level');
  effectRange.classList.add('hidden');
  var toggleEffectHandler = function (num) {
    effectItem[num].addEventListener('click', function () {
      if (num === 0) {
        effectRange.classList.add('hidden');
      } else {
        effectRange.classList.remove('hidden');
      }
      var effectName = effectItem[num].querySelector('.effects__radio').value;

      var findedClass = pictureSource.classList + '';
      pictureSource.classList.remove(findedClass.match(/effects__preview--\w+\b/));
      pictureSource.classList.add('effects__preview--' + effectName);

      var effectsSource = {
        none: {type: 'none', max: 'none'},
        chrome: {type: 'grayscale', min: 0, max: 1, unit: ''},
        sepia: {type: 'sepia', min: 0, max: 1, unit: ''},
        marvin: {type: 'invert', min: 0, max: 100, unit: '%'},
        phobos: {type: 'blur', min: 0, max: 3, unit: 'px'},
        heat: {type: 'brightness', min: 1, max: 3, unit: ''}
      };
      // сброс уровня фильтра + положение ползунка + цвет полосы ползунка
      if (effectsSource[effectName].type === 'none') {
        pictureSource.style.filter = effectsSource[effectName].type;
      } else {
        pictureSource.style.filter = effectsSource[effectName].type + '(' + effectsSource[effectName].max + effectsSource[effectName].unit + ')';
      }
      document.querySelector('.effect-level__pin').style.left = '100%';
      document.querySelector('.effect-level__depth').style.width = '100%';
      document.querySelector('.effect-level__value').value = effectsSource[effectName].max;
    });
  };

  for (var k = 0; k < effectItem.length; k++) {
    toggleEffectHandler(k);
  }
};
switchEffectType();

// валидация введенных хэштегов
var hashtagsValidation = function () {
  inputHashtags.addEventListener('blur', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var inputHashtagsArr = inputHashtags.value.split(' ');

    // проверка кол-ва хэштегов
    if (!inputHashtagsArr[0]) {
      inputHashtags.setCustomValidity('');
      // если нет даже первого - прекратить
      return;
    } else if (inputHashtagsArr.length > COUNT_HASHTAGS) {
      inputHashtags.setCustomValidity('Много хэштегов. максимум - 5');
      inputHashtags.focus();
      } else {
        inputHashtags.setCustomValidity('');
      }

    // проверка валидности каждого хэштега
    for (var i = 0; i < inputHashtagsArr.length; i++) {
      if (inputHashtagsArr[i].charAt(0) !== '#' || inputHashtagsArr[i].length > HASHTAG_LENGTH || inputHashtagsArr[i].length < 2) {
        inputHashtags.setCustomValidity('Неправильный хэштег - ' + inputHashtagsArr[i]);
        inputHashtags.focus();
      }
      // проверка на дублирование
      for (var j = i; j < inputHashtagsArr.length - 1; j++) {
        if (inputHashtagsArr[j + 1] === inputHashtagsArr[i]) {
          inputHashtags.setCustomValidity('Нельзя повторять хэштеги - ' + inputHashtagsArr[i]);
          inputHashtags.focus();
        }
      }
    }
  });
};
hashtagsValidation();
