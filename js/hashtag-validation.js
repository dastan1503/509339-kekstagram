'use strict';
(function () {
  var hashtags = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');
  var errorMessage = function (message) {
    if (!message) {
      hashtags.setCustomValidity('');
      hashtags.style.outline = '';
      submitButton.disabled = false;
    } else {
      hashtags.style.outline = '2px solid red';
      hashtags.setCustomValidity(message);
      submitButton.disabled = true;
    }
  };

  hashtags.addEventListener('input', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var hashtagsArr = hashtags.value.toLowerCase().split(' ');
    var count = hashtagsArr.length - 1;


    // удаляем пустые элементы массива
    for (var i = count; i >= 0; i--) {
      if (hashtagsArr[i] === '') {
        hashtagsArr.splice(i, 1);
      }
    }

    // проверка кол-ва хэштегов
    if (hashtagsArr.length > COUNT_HASHTAGS) {
      errorMessage('Много хэштегов. максимум - 5');
    } else {
      errorMessage();
    }

    // проверка валидности каждого хэштега
    hashtagsArr.forEach(function (element, index) {
      if (element.charAt(0) !== '#' || element.length > HASHTAG_LENGTH || element.length < 2) {
        errorMessage('Неправильный хэштег - ' + element);
      }
      // проверка на дублирование
      for (var j = index; j < hashtagsArr.length - 1; j++) {
        if (hashtagsArr[j + 1] === element) {
          errorMessage('Нельзя повторять хэштеги - ' + element);
        }
      }
    });
  });
})();
