'use strict';
window.openClosePopup = (function (blocks) {
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;
  var inputDescription = document.querySelector('.text__description');
  var inputHashtags = document.querySelector('.text__hashtags');
  var body = document.querySelector('body');
  // открытие/закрытие большого фото
  var switchFullPhoto = function () {
    var pictureMin = document.querySelectorAll('.picture');
    var pictureBig = document.querySelector('.big-picture');
    var closeButton = document.querySelector('.big-picture__cancel');

    var showPictureBig = function (num) {
      var openPopupPictureBig = function () {
        pictureBig.classList.remove('hidden');
        body.classList.add('modal-open');
        drawFullPicture(blocks[num]);
        closePopup(closeButton, pictureBig);
      };

      pictureMin[num].addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE_ENTER) {
          openPopupPictureBig();
        }
      });

      pictureMin[num].addEventListener('click', function () {
        openPopupPictureBig();
      });
    };

    pictureMin.forEach(function (element, index) {
      showPictureBig(index);
    });

    var commentBlock = document.querySelector('.social__comment');
    var drawFullPicture = function (picture) {
      // формирование большого блока с изображением
      document.querySelector('.comments-loader').classList.remove('hidden');
      pictureBig.querySelector('.big-picture__img img').src = picture.url;
      pictureBig.querySelector('.likes-count').textContent = picture.likes;
      pictureBig.querySelector('.comments-count').textContent = picture.comments.length;
      pictureBig.querySelector('.social__caption').textContent = picture.description;
      // удаляем существующие в разметке комментарии
      var commentsContainer = document.querySelector('.social__comments');
      while (commentsContainer.firstChild) {
        commentsContainer.removeChild(commentsContainer.firstChild);
      }
      // отрисовываем сгенерированные комментарии
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 5; i++) {
        if (!picture.comments[i]) {
          document.querySelector('.comments-loader').classList.add('hidden');
          break;
        }
        var commentTemplate = commentBlock.cloneNode(true);
        commentTemplate.querySelector('img').src = picture.comments[i].avatar;
        commentTemplate.querySelector('img').title = picture.comments[i].name;
        commentTemplate.querySelector('.social__text').textContent = picture.comments[i].message;
        fragment.appendChild(commentTemplate);
      }
      commentsContainer.appendChild(fragment);
    };
  };
  switchFullPhoto();

  // функция закрытия окна
  var closePopup = function (button, popup) {
    var closeWindow = function () {
      popup.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', closePopupEsc);
    };

    var closePopupEsc = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE_ESC &&
          document.activeElement !== inputDescription &&
          document.activeElement !== inputHashtags) {
          closeWindow();
        }
      });
    };

    var closePopupEnter = function () {
      button.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEYCODE_ENTER) {
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
    var uploadFile = document.querySelector('#upload-file');
    var editImgWindow = document.querySelector('.img-upload__overlay');
    var closeButton = document.querySelector('.img-upload__cancel');
    uploadFile.addEventListener('change', function () {
      editImgWindow.classList.remove('hidden');
      document.querySelector('.effect-level').classList.add('hidden');
      closePopup(closeButton, editImgWindow);
    });
  };
  switchEditPhotoPopup();
});
