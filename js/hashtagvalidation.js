'use strict';
(function () {
  var hashtags = window.data().links.inputHashtags;
  hashtags.addEventListener('blur', function () {
    var COUNT_HASHTAGS = 5;
    var HASHTAG_LENGTH = 20;
    var inputHashtagsArr = hashtags.value.split(' ');
    var count = inputHashtagsArr.length - 1;
    // удаляем пустые элементы массива
    for (var i = count; i >= 0; i--) {
      if (inputHashtagsArr[i] === '') {
        inputHashtagsArr.splice(i, 1);
      }
    }

    // проверка кол-ва хэштегов
    if (inputHashtagsArr[0] === '') {
      window.data().links.inputHashtags.setCustomValidity('');
      // если нет даже первого - прекратить
      return;
    } else if (inputHashtagsArr.length > COUNT_HASHTAGS) {
      window.data().links.inputHashtags.setCustomValidity('Много хэштегов. максимум - 5');
    } else {
      window.data().links.inputHashtags.setCustomValidity('');
    }

    // проверка валидности каждого хэштега
    for (i = 0; i < inputHashtagsArr.length; i++) {
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
})();
