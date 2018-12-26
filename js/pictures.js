'use strict';

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

// валидация введенных хэштегов
var hashtagsValidation = function () {
  window.data().links.inputHashtags.addEventListener('blur', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var inputHashtagsArr = window.data().other.inputHashtags.value.split(' ');
    // проверка кол-ва хэштегов
    if (!inputHashtagsArr[0]) {
      window.data().links.inputHashtags.setCustomValidity('');
      // если нет даже первого - прекратить
      return;
    } else if (inputHashtagsArr.length > COUNT_HASHTAGS) {
      window.data().links.inputHashtags.setCustomValidity('Много хэштегов. максимум - 5');
    } else {
      window.data().links.inputHashtags.setCustomValidity('');
    }

    // проверка валидности каждого хэштега
    for (var i = 0; i < inputHashtagsArr.length; i++) {
      if (inputHashtagsArr[i].charAt(0) !== '#' || inputHashtagsArr[i].length > HASHTAG_LENGTH || inputHashtagsArr[i].length < 2) {

        window.data().links.inputHashtags.setCustomValidity('Неправильный хэштег - ' + inputHashtagsArr[i]);
      }
      // проверка на дублирование
      for (var j = i; j < inputHashtagsArr.length - 1; j++) {
        if (inputHashtagsArr[j + 1] === inputHashtagsArr[i]) {
          window.data().links.inputHashtags.setCustomValidity('Нельзя повторять хэштеги - ' + inputHashtagsArr[i]);
        }
      }
    }
  });
};
hashtagsValidation();
