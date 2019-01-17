'use strict';
window.openClosePopup = (function (blocks) {
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;
  var inputDescription = document.querySelector('.text__description');
  var inputHashtags = document.querySelector('.text__hashtags');
  var body = document.querySelector('body');
  var COUNT_COMMENTS = 5;

  var buttonLoadComments = document.querySelector('.comments-loader');
  buttonLoadComments.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.drawComments();
  });
  // открытие/закрытие большого фото
  var switchFullPhoto = function () {
    var pictureMin = document.querySelectorAll('.picture');
    var pictureBig = document.querySelector('.big-picture');
    var closeButton = document.querySelector('.big-picture__cancel');
    var commentBlock = document.querySelector('.social__comment');

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

    var drawFullPicture = function (picture) {
      // формирование большого блока с изображением
      pictureBig.querySelector('.big-picture__img img').src = picture.url;
      pictureBig.querySelector('.likes-count').textContent = picture.likes;
      pictureBig.querySelector('.social__caption').textContent = picture.description;

      // удаляем существующие в разметке комментарии
      var commentsContainer = document.querySelector('.social__comments');

      while (commentsContainer.firstChild) {
        commentsContainer.removeChild(commentsContainer.firstChild);
      }

      // отрисовываем сгенерированные комментарии
      window.drawComments = function () {
        buttonLoadComments.classList.remove('hidden');
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < COUNT_COMMENTS; i++) {
          var commentsInPage = document.querySelectorAll('.social__comment').length;
          if (!picture.comments[i + commentsInPage]) {
            buttonLoadComments.classList.add('hidden');
            break;
          }
          var commentTemplate = commentBlock.cloneNode(true);
          commentTemplate.querySelector('img').src = picture.comments[i + commentsInPage].avatar;
          commentTemplate.querySelector('img').title = picture.comments[i + commentsInPage].name;
          commentTemplate.querySelector('.social__text').textContent = picture.comments[i + commentsInPage].message;
          fragment.appendChild(commentTemplate);
        }

        commentsContainer.appendChild(fragment);
        document.querySelector('.social__comment-count').textContent = (i + commentsInPage) + ' из ' + picture.comments.length + ' комментариев';
      };
      window.drawComments();
    };
  };
  switchFullPhoto();

  // функция закрытия окна
  var closePopup = function (button, popup) {
    var closeWindow = function () {
      if (button === document.querySelector('.img-upload__cancel')) {
        window.resetForm();
      }
      popup.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', closePopupEsc);
    };

    var onEscKeydownHandler = function (evt) {
      if (evt.keyCode === KEYCODE_ESC &&
        document.activeElement !== inputDescription &&
        document.activeElement !== inputHashtags) {
        closeWindow();
      }
    };

    var closePopupEsc = function () {
      document.addEventListener('keydown', onEscKeydownHandler);
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
    var preview = document.querySelector('.img-upload__preview img');
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


    uploadFile.addEventListener('change', function () {
      var file = uploadFile.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }

      editImgWindow.classList.remove('hidden');
      document.querySelector('.effect-level').classList.add('hidden');
      document.querySelector('.scale__control--value').value = '100%';
      window.editScalePhoto();
      closePopup(closeButton, editImgWindow);
    });
  };
  switchEditPhotoPopup();
});
