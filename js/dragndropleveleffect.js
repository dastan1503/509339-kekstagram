'use strict';
(function () {
  window.data().links.effectRange.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var RIGHT_COORDS = 450;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      var finishCoords = window.data().links.effectRange.offsetLeft - shift;
      if (finishCoords < 0) {
        finishCoords = 0;
      } else if (finishCoords > RIGHT_COORDS) {
        finishCoords = RIGHT_COORDS;
      } else {
        startCoords = moveEvt.clientX;
      }
      window.data().links.effectRange.style.left = finishCoords + 'px';
      document.querySelector('.effect-level__depth').style.width = finishCoords + 'px';
      document.querySelector('.effect-level__value').value = Math.floor(finishCoords / RIGHT_COORDS * 100);
      // отрисовка уровня эффекта на изображении в пропорции от положения ползунка
      var proportion = window.data().links.effectLevel.value / 100 *
        (window.data().source.effectsSource[window.data().links.effectName[window.data().other.effectCount].value].max -
        window.data().source.effectsSource[window.data().links.effectName[window.data().other.effectCount].value].min) +
        window.data().source.effectsSource[window.data().links.effectName[window.data().other.effectCount].value].min;

      window.data().links.pictureSource.style.filter = window.data().source.effectsSource[window.data().links.effectName[window.data().other.effectCount].value].type +
      '(' +
      proportion +
      window.data().source.effectsSource[window.data().links.effectName[window.data().other.effectCount].value].unit +
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
