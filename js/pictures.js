'use strict';
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
  var effectRangeBlock = document.querySelector('.effect-level');

  effectRangeBlock.classList.add('hidden');
  var toggleEffectHandler = function (num) {
    effectItem[num].addEventListener('click', function () {
      if (num === 0) {
        effectRangeBlock.classList.add('hidden');
      } else {
        effectRangeBlock.classList.remove('hidden');
      }

      effectCount = num;
      var findedClass = pictureSource.classList + '';
      pictureSource.classList.remove(findedClass.match(/effects__preview--\w+\b/));
      pictureSource.classList.add('effects__preview--' + effectName[num].value);

      // сброс уровня фильтра + положение ползунка + цвет полосы ползунка
      document.querySelector('.effect-level__pin').style.left = '100%';
      document.querySelector('.effect-level__depth').style.width = '100%';
      pictureSource.style = '';
      document.querySelector('.effect-level__value').value = '100';
    });
  };

  for (var k = 0; k < effectItem.length; k++) {
    toggleEffectHandler(k);
  }
};
switchEffectType();

// валидация введенных хэштегов
var hashtagsValidation = function () {
  window.data().links.inputHashtags.addEventListener('blur', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var inputHashtagsArr = window.data().other.inputHashtags.value.split(' ');
    // проверка кол-ва хэштегов
    if (!inputHashtagsArr[0]) {
      inputHashtags.setCustomValidity('');
      // если нет даже первого - прекратить
      return;
    } else if (inputHashtagsArr.length > COUNT_HASHTAGS) {
      inputHashtags.setCustomValidity('Много хэштегов. максимум - 5');
    } else {
      inputHashtags.setCustomValidity('');
    }

    // проверка валидности каждого хэштега
    for (var i = 0; i < inputHashtagsArr.length; i++) {
      if (inputHashtagsArr[i].charAt(0) !== '#' || inputHashtagsArr[i].length > HASHTAG_LENGTH || inputHashtagsArr[i].length < 2) {

        inputHashtags.setCustomValidity('Неправильный хэштег - ' + inputHashtagsArr[i]);
      }
      // проверка на дублирование
      for (var j = i; j < inputHashtagsArr.length - 1; j++) {
        if (inputHashtagsArr[j + 1] === inputHashtagsArr[i]) {
          inputHashtags.setCustomValidity('Нельзя повторять хэштеги - ' + inputHashtagsArr[i]);
        }
      }
    }
  });
};
hashtagsValidation();

var dragNDropLevelEffect = function () {
  window.data().links.effectRange.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var RIGHT_COORDS = 450;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      var finishCoords = effectRange.offsetLeft - shift;
      if (finishCoords < 0) {
        finishCoords = 0;
      } else if (finishCoords > RIGHT_COORDS) {
        finishCoords = RIGHT_COORDS;
      } else {
        startCoords = moveEvt.clientX;
      }
      effectRange.style.left = finishCoords + 'px';
      document.querySelector('.effect-level__depth').style.width = finishCoords + 'px';
      document.querySelector('.effect-level__value').value = Math.floor(finishCoords / RIGHT_COORDS * 100);
      // отрисовка уровня эффекта на изображении в пропорции от положения ползунка
      var proportion = effectLevel.value / 100 * (effectsSource[effectName[effectCount].value].max - effectsSource[effectName[effectCount].value].min) + effectsSource[effectName[effectCount].value].min;

      pictureSource.style.filter = effectsSource[effectName[effectCount].value].type + '(' + proportion + effectsSource[effectName[effectCount].value].unit + ')';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
};
dragNDropLevelEffect();


