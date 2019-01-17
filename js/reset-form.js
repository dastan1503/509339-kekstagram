'use strict';
(window.resetForm = function () {
  document.querySelector('#upload-select-image').reset();
  document.querySelector('#upload-file').value = '';
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.effect-level__value').value = 100;
  document.querySelector('.img-upload__preview').classList = 'img-upload__preview img-upload__preview--none';
  document.querySelector('.img-upload__preview').style = '';
})();
