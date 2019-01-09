'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var loadPic = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message--loading')
    .cloneNode(true);

  var main = document.querySelector('main');
  main.appendChild(loadPic);

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        main.removeChild(loadPic);
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'с');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load(
      function (blocks) {
        window.drawMiniatures(blocks);
      },
      function (message) {
        main.removeChild(loadPic);
        var errorPopup = document.querySelector('#error')
          .content
          .querySelector('.error');
        errorPopup.querySelector('.error__title').textContent = message;
        errorPopup.querySelector('.error__button--other').classList.add('hidden');
        main.appendChild(errorPopup);
      }
  );

  window.send = function (data, onLoad, onError) {
    URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        main.removeChild(loadPic);
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'с');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var form = document.querySelector('#upload-select-image');

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
          editImgWindow.classList.add('hidden');
          main.appendChild(uploadPopup);
          var closeUploadPopup = function () {
            document.addEventListener('click', function () {
              main.removeChild(uploadPopup);
              document.removeEventListener('click', closeUploadPopup);
            });
            document.addEventListener('keydown', function (keyevt) {
              var KEYCODE_ESC = 27;
              if (keyevt.keyCode === KEYCODE_ESC) {
                main.removeChild(uploadPopup);
                document.removeEventListener('keydown', closeUploadPopup);
              }
            });
          };
          closeUploadPopup();
        },

        function (message) {
          main.removeChild(loadPic);
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
