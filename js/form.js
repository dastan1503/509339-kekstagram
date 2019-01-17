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
    var closePopupHandler = function () {
      main.removeChild(popup);
      document.removeEventListener('click', closePopupHandler);
      document.removeEventListener('keydown', closePopupESCHandler);
    };
    document.addEventListener('click', closePopupHandler);

    var closePopupESCHandler = function (keyevt) {
      if (keyevt.keyCode === 27) {
        main.removeChild(popup);
        document.removeEventListener('click', closePopupHandler);
        document.removeEventListener('keydown', closePopupESCHandler);
      }
    };
    document.addEventListener('keydown', closePopupESCHandler);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    main.appendChild(loadPic);

    window.send(
        new FormData(form),

        function () {
          window.resetForm();
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
