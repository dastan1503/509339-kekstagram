'use strict';
(function () {
  var form = document.querySelector('#upload-select-image');
  var main = document.querySelector('main');
  var loadPic = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message--loading')
    .cloneNode(true);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    main.appendChild(loadPic);
    var uploadPopup = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);
    var editImgWindow = document.querySelector('.img-upload__overlay');

    window.send(
        new FormData(form),

        function () {
          document.querySelector('#upload-file').value = '';
          document.querySelector('.scale__control--value').value = '100%';
          document.querySelector('.effect-level__value').value = 100;
          document.querySelector('.img-upload__preview').classList = 'img-upload__preview img-upload__preview--none';
          document.querySelector('.img-upload__preview').style = '';
          editImgWindow.classList.add('hidden');
          main.appendChild(uploadPopup);

          var closePopup = function () {
            main.removeChild(uploadPopup);
            document.removeEventListener('click', closePopup);
            document.removeEventListener('keydown', closePopup);
          };

          document.addEventListener('click', closePopup);
          document.addEventListener('keydown', function (keyevt) {
            if (keyevt.keyCode === 27) {
              closePopup();
            }
          });
        },

        function (message) {
          editImgWindow.classList.add('hidden');
          var errorPopup = document.querySelector('#error')
            .content
            .querySelector('.error');
          errorPopup.querySelector('.error__title').textContent = message;
          main.appendChild(errorPopup);
        }
    );
  });

})();
