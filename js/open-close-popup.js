'use strict';
(function () {
  // открытие/закрытие большого фото
  var switchFullPhoto = function () {
    var pictureMin = document.querySelectorAll('.picture');
    var pictureBig = document.querySelector('.big-picture');
    var closeButton = document.querySelector('.big-picture__cancel');

    var showPictureBig = function (num) {
      var openPopupPictureBig = function () {
        pictureBig.classList.remove('hidden');
        drawFullPicture(num);
        closePopup(closeButton, pictureBig);
      };

      pictureMin[num].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data().other.KEYCODE_ENTER) {
          openPopupPictureBig();
        }
      });

      pictureMin[num].addEventListener('click', function () {
        openPopupPictureBig();
      });
    };

    for (var i = 0; i < pictureMin.length; i++) {
      showPictureBig(i);
    }

    var commentBlock = document.querySelector('.social__comment');

    var drawFullPicture = function (picture) {

      // формирование большого блока с изображением
      // адрес
      pictureBig.querySelector('.big-picture__img img').src = pictureMin[picture].querySelector('img').src;
      // лайки кол-во
      var likes = pictureMin[picture].querySelector('.picture__likes').textContent;
      pictureBig.querySelector('.likes-count').textContent = likes;
      // комментарии количество
      pictureBig.querySelector('.comments-count').textContent = pictureMin[picture].querySelector('.picture__comments').textContent;
      // описание фото
      pictureBig.querySelector('.social__caption').textContent = pictureMin[picture].querySelector('img').dataset.text;

      // удаляем существующие в разметке комментарии
      var commentsContainer = document.querySelector('.social__comments');
      while (commentsContainer.firstChild) {
        commentsContainer.removeChild(commentsContainer.firstChild);
      }
      // отрисовываем сгенерированные комментарии
      var fragment = document.createDocumentFragment();
      for (i = 0; i < pictureBig.querySelector('.comments-count').textContent; i++) {
        var commentTemplate = commentBlock.cloneNode(true);
        commentTemplate.querySelector('img').src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
        commentTemplate.querySelector('.social__text').textContent = pictureMin[picture].querySelector('.picture__comments').dataset[i];
        fragment.appendChild(commentTemplate);
      }
      commentsContainer.appendChild(fragment);
    };
  };
  switchFullPhoto();

  // функция закрытия окна
  var closePopup = function (button, PopupName) {
    var closeWindow = function () {
      PopupName.classList.add('hidden');
      document.removeEventListener('keydown', closePopupEsc);
    };

    var closePopupEsc = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data().other.KEYCODE_ESC &&
          document.activeElement !== window.data().links.inputDescription &&
          document.activeElement !== window.data().links.inputHashtags) {
          closeWindow();
        }
      });
    };

    var closePopupEnter = function () {
      button.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.data().other.KEYCODE_ENTER) {
          closeWindow();
        }
      });
    };
    var closeClick = function () {
      button.addEventListener('click', function () {
        closeWindow();
      });
    };
    closePopupEsc();
    closePopupEnter();
    closeClick();
  };

  // открытие\закрытие окна редактирования фото
  var switchEditPhotoPopup = function () {
    var uploadFile = document.getElementById('upload-file');
    var editImgwindow = document.querySelector('.img-upload__overlay');
    var closeButton = document.querySelector('.img-upload__cancel');
    uploadFile.addEventListener('change', function () {
      editImgwindow.classList.remove('hidden');
      document.querySelector('.effect-level').classList.add('hidden');
      closePopup(closeButton, editImgwindow);
    });
  };
  switchEditPhotoPopup();
})();
