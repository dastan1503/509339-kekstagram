'use strict';
(window.switchEffectType = function () {
  var effectsSource = {
    none: {type: 'none', MAX: 'none'},
    chrome: {type: 'grayscale', MIN: 0, MAX: 1, unit: ''},
    sepia: {type: 'sepia', MIN: 0, MAX: 1, unit: ''},
    marvin: {type: 'invert', MIN: 0, MAX: 100, unit: '%'},
    phobos: {type: 'blur', MIN: 0, MAX: 3, unit: 'px'},
    heat: {type: 'brightness', MIN: 1, MAX: 3, unit: ''}
  };

  var pictureSource = document.querySelector('.img-upload__preview');
  var effectItem = document.querySelectorAll('.effects__item');
  var effectRangeBlock = document.querySelector('.effect-level');
  var effectName = document.querySelectorAll('.effects__radio');
  var pin = document.querySelector('.effect-level__pin');
  var depth = document.querySelector('.effect-level__depth');
  var inputValue = document.querySelector('.effect-level__value');

  var toggleEffectHandler = function (num) {
    var effectLink = effectsSource[effectName[num].value];
    var effectType = effectLink.type;
    var effectMAXValue = effectLink.MAX;
    var effectUnit = effectLink.unit;
    effectItem[num].addEventListener('change', function () {
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

  effectItem.forEach(function (element, index) {
    toggleEffectHandler(index);
  });

  return effectsSource[document.querySelector('.effects__item input:checked').value];
})();
