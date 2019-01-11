'use strict';
(function () {
  var form = document.querySelector('#upload-select-image');
  var main = document.querySelector('main');
  var loadPic = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message--loading')
    .cloneNode(true);
  var uploadPopup = document.querySelector('#success')
      .content
      .querySelector('.success')
      .cloneNode(true);
  var editImgWindow = document.querySelector('.img-upload__overlay');

  var closingMessage = function (popup) {
    var closePopup = function () {
      main.removeChild(popup);
      document.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', closePopupESC);
    };
    document.addEventListener('click', closePopup);

    var closePopupESC = function (keyevt) {
      if (keyevt.keyCode === 27) {
        main.removeChild(popup);
        document.removeEventListener('click', closePopup);
        document.removeEventListener('keydown', closePopupESC);
      }
    };
    document.addEventListener('keydown', closePopupESC);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    main.appendChild(loadPic);

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
          closingMessage(uploadPopup);
        },

        function (message) {
          editImgWindow.classList.add('hidden');
          var errorPopup = document.querySelector('#error')
            .content
            .querySelector('.error')
            .cloneNode(true);
          errorPopup.querySelector('.error__title').textContent = message;
          main.appendChild(errorPopup);
          closingMessage(errorPopup);
        }
    );
  });

})();
