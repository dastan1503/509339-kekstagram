'use strict';
(function () {
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
})();
