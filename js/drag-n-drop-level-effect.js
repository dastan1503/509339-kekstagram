'use strict';
(function () {
  var effectRange = document.querySelector('.effect-level__pin');
  var pictureSource = document.querySelector('.img-upload__preview');
  var effectLevel = document.querySelector('.effect-level__value');
  var depth = document.querySelector('.effect-level__depth');
  var inputValue = document.querySelector('.effect-level__value');
  var RIGHT_COORDS = 450;
  effectRange.addEventListener('mousedown', function (evt) {
    var effect = window.switchEffectType();
    evt.preventDefault();
    var startCoords = evt.clientX;
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
      depth.style.width = finishCoords + 'px';
      inputValue.value = Math.floor(finishCoords / RIGHT_COORDS * 100);
      // отрисовка уровня эффекта на изображении в пропорции от положения ползунка
      var maxValue = effect.MAX;
      var minValue = effect.MIN;

      var proportion = effectLevel.value / 100 * (maxValue - minValue) + minValue;

      pictureSource.style.filter =
      effect.type +
      '(' + proportion +
      effect.unit +
      ')';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
