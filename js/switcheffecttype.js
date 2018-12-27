'use strict';
(window.switchEffectType = function () {
  var effectItem = document.querySelectorAll('.effects__item');
  var effectRangeBlock = document.querySelector('.effect-level');

  var toggleEffectHandler = function (num) {
    effectItem[num].addEventListener('click', function () {
      if (num === 0) {
        effectRangeBlock.classList.add('hidden');
      } else {
        effectRangeBlock.classList.remove('hidden');
      }

      var findedClass = window.data().links.pictureSource.classList + '';
      window.data().links.pictureSource.classList.remove(findedClass.match(/effects__preview--\w+\b/));
      window.data().links.pictureSource.classList.add('effects__preview--' +
      window.data().links.effectName[num].value);

      // сброс уровня фильтра + положение ползунка + цвет полосы ползунка
      document.querySelector('.effect-level__pin').style.left = '100%';
      document.querySelector('.effect-level__depth').style.width = '100%';
      window.data().links.pictureSource.style = '';
      document.querySelector('.effect-level__value').value = '100';
    });
  };

  for (var k = 0; k < effectItem.length; k++) {
    toggleEffectHandler(k);
  }
  return document.querySelector('.effects__item input:checked').value;
})();
