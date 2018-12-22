'use strict';
(window.data = function () {
  var data = {
    links: {
      inputHashtags: document.querySelector('.text__hashtags'),
      inputDescription: document.querySelector('.text__description'),
      pictureSource: document.querySelector('.img-upload__preview'),
      effectRange: document.querySelector('.effect-level__pin'),
      effectLevel: document.querySelector('.effect-level__value'),
      effectName: document.querySelectorAll('.effects__radio')
    },

    source: {
      descriptionsArr: [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
      ],

      commentsSource: [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ],

      effectsSource: {
        none: {type: 'none', max: 'none'},
        chrome: {type: 'grayscale', min: 0, max: 1, unit: ''},
        sepia: {type: 'sepia', min: 0, max: 1, unit: ''},
        marvin: {type: 'invert', min: 0, max: 100, unit: '%'},
        phobos: {type: 'blur', min: 0, max: 3, unit: 'px'},
        heat: {type: 'brightness', min: 1, max: 3, unit: ''}
      }
    },

    other: {
      PICTURE_COUNT: 25,
      KEYCODE_ESC: 27,
      KEYCODE_ENTER: 13,
      effectCount: 0
    }
  };
  return data;
})();
