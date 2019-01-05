'use strict';
(function () {
  var hashtags = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('#upload-submit');
  hashtags.addEventListener('input', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var hashtagsArr = hashtags.value.split(' ');
    var count = hashtagsArr.length - 1;
    // удаляем пустые элементы массива
    for (var i = count; i >= 0; i--) {
      if (hashtagsArr[i] === '') {
        hashtagsArr.splice(i, 1);
      }
    }

    // проверка кол-ва хэштегов
    if (hashtagsArr[0] === '') {
      hashtags.setCustomValidity('');
      submitButton.disabled = false;
      // если нет даже первого - прекратить
      return;
    } else if (hashtagsArr.length > COUNT_HASHTAGS) {
      hashtags.setCustomValidity('Много хэштегов. максимум - 5');
      submitButton.disabled = true;
    } else {
      hashtags.setCustomValidity('');
      submitButton.disabled = false;
    }

    // проверка валидности каждого хэштега
    for (i = 0; i < hashtagsArr.length; i++) {
      if (hashtagsArr[i].charAt(0) !== '#' || hashtagsArr[i].length > HASHTAG_LENGTH || hashtagsArr[i].length < 2) {

        hashtags.setCustomValidity('Неправильный хэштег - ' + hashtagsArr[i]);
        submitButton.disabled = true;
      }
      // проверка на дублирование
      for (var j = i; j < hashtagsArr.length - 1; j++) {
        if (hashtagsArr[j + 1] === hashtagsArr[i]) {
          hashtags.setCustomValidity('Нельзя повторять хэштеги - ' + hashtagsArr[i]);
          submitButton.disabled = true;
        }
      }
    }
  });
})();
