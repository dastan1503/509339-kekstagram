'use strict';
(window.switchEffectType = function () {
  var pictureSource = document.querySelector('.img-upload__preview');
  var effectItem = document.querySelectorAll('.effects__item');
  var effectRangeBlock = document.querySelector('.effect-level');
  var effectName = document.querySelectorAll('.effects__radio');
  var pin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');
  var inputValue = document.querySelector('.effect-level__value');

  var toggleEffectHandler = function (num) {
    var effectType = window.data.effectsSource[effectName[num].value].type;
    var effectMAXValue = window.data.effectsSource[effectName[num].value].MAX;
    var effectUnit = window.data.effectsSource[effectName[num].value].unit;
    effectItem[num].addEventListener('click', function () {
      if (num === 0) {
        effectRangeBlock.classList.add('hidden');
        pictureSource.style.filter = 'none';
      } else {
        effectRangeBlock.classList.remove('hidden');
        pictureSource.style.filter = effectType + '(' + effectMAXValue + effectUnit + ')';
      }

      var findedClass = pictureSource.classList + '';
      pictureSource.classList.remove(findedClass.match(/effects__preview--\w+\b/));
      pictureSource.classList.add('effects__preview--' + effectName[num].value);
      // сброс уровня фильтра + положение ползунка + цвет полосы ползунка
      pin.style.left = '100%';
      depth.style.width = '100%';
      inputValue.value = '100';
    });
  };

  for (var k = 0; k < effectItem.length; k++) {
    toggleEffectHandler(k);
  }
  return document.querySelector('.effects__item input:checked').value;
})();
