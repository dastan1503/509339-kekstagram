'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var loadPic = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message--loading');
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
})();


