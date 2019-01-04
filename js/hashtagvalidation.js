'use strict';
(function () {
  var hashtags = document.querySelector('.text__hashtags');
  hashtags.addEventListener('blur', function () {
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
      // если нет даже первого - прекратить
      return;
    } else if (hashtagsArr.length > COUNT_HASHTAGS) {
      hashtags.setCustomValidity('Много хэштегов. максимум - 5');
    } else {
      hashtags.setCustomValidity('');
    }

    // проверка валидности каждого хэштега
    for (i = 0; i < hashtagsArr.length; i++) {
      if (hashtagsArr[i].charAt(0) !== '#' || hashtagsArr[i].length > HASHTAG_LENGTH || hashtagsArr[i].length < 2) {

        hashtags.setCustomValidity('Неправильный хэштег - ' + hashtagsArr[i]);
      }
      // проверка на дублирование
      for (var j = i; j < hashtagsArr.length - 1; j++) {
        if (hashtagsArr[j + 1] === hashtagsArr[i]) {
          hashtags.setCustomValidity('Нельзя повторять хэштеги - ' + hashtagsArr[i]);
        }
      }
    }
  });
})();
