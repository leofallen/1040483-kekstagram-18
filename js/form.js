'use strict';

(function () {

  var imgSetup = window.picturesList.querySelector('.img-upload__overlay');
  var img = window.picturesList.querySelector('.img-upload__preview').querySelector('img');
  var imgScaleOutput = window.picturesList.querySelector('.scale__control--value');
  var effectLevelPin = window.picturesList.querySelector('.effect-level__pin');
  var effectLevelDepth = window.picturesList.querySelector('.effect-level__depth');
  var imgUploadForm = window.picturesList.querySelector('.img-upload__form');
  var upLoader = window.picturesList.querySelector('#upload-file');
  var imgSetupButtonClose = window.picturesList.querySelector('.img-upload__cancel');
  var hashtagInput = window.picturesList.querySelector('.text__hashtags');
  var commentInput = window.picturesList.querySelector('.text__description');
  var imgScaleSmall = window.picturesList.querySelector('.scale__control--smaller');
  var imgScaleBig = window.picturesList.querySelector('.scale__control--bigger');
  var effects = window.picturesList.querySelectorAll('.effects__radio');
  var effectLevelBar = window.picturesList.querySelector('.img-upload__effect-level');
  var effectLevelValue = window.picturesList.querySelector('.effect-level__value');
  var TemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  var TemplateError = document.querySelector('#error').content.querySelector('.error');
  var TemplateLoad = document.querySelector('#messages').content.querySelector('.img-upload__message');

  var IMG_MIN_SIZE = 25;
  var IMG_MAX_SIZE = 100;
  var MIN_SLIDER_COORDS = 0;
  var MAX_SLIDER_COORDS = 453;
  var HASHTAG_LENGTH = 20;
  var MAX_TAGS = 5;

  var onUpLoaderChange = function () {
    imgSetup.classList.remove('hidden');
    document.addEventListener('keydown', onImgSetupEscPress);
  };

  var imgSetupReset = function () {
    img.style.transform = 'scale(1)';
    imgScaleOutput.value = '100%';
    img.removeAttribute('style');
    img.removeAttribute('class');
    effectLevelPin.style.left = '453px';
    effectLevelDepth.style.width = '100%';
  };

  var onImgSetupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      imgSetup.classList.add('hidden');
      imgSetupReset();
      imgUploadForm.reset();
    }
  };

  var onOverlayImgCloseClick = function (evt) {
    if (evt.target === imgSetup) {
      imgSetup.classList.add('hidden');
      document.removeEventListener('keydown', onImgSetupEscPress);
      imgSetupReset();
    }
  };

  var imgSetupClose = function () {
    imgSetup.classList.add('hidden');
    document.removeEventListener('keydown', onImgSetupEscPress);
    imgSetupReset();
  };

  upLoader.addEventListener('change', onUpLoaderChange);
  imgSetupButtonClose.addEventListener('click', imgSetupClose);
  hashtagInput.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onImgSetupEscPress);
  });
  hashtagInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onImgSetupEscPress);
  });
  commentInput.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onImgSetupEscPress);
  });
  commentInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onImgSetupEscPress);
  });
  imgSetup.addEventListener('click', onOverlayImgCloseClick);

  // мастшабирование фотографии

  img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';

  imgScaleSmall.addEventListener('click', function () {
    if (imgScaleOutput.value.replace('%', '') > IMG_MIN_SIZE) {
      var numValue = (imgScaleOutput.value.replace('%', ''));
      imgScaleOutput.value = numValue - IMG_MIN_SIZE;
      img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';
      imgScaleOutput.value = imgScaleOutput.value + '%';
    }
  });

  imgScaleBig.addEventListener('click', function () {
    if (imgScaleOutput.value.replace('%', '') < IMG_MAX_SIZE) {
      var numValue = (imgScaleOutput.value.replace('%', ''));
      imgScaleOutput.value = Number(numValue) + IMG_MIN_SIZE;
      img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';
      imgScaleOutput.value = imgScaleOutput.value + '%';
    }
  });

  // переключение фильтров для фото

  var filterClickListener = function (button) {
    button.addEventListener('click', function () {
      img.className = 'effects__preview--' + button.value;
      img.removeAttribute('style');
      effectLevelPin.style.left = '453px';
      effectLevelDepth.style.width = '100%';
      effectLevelBar.removeAttribute('style');
      if (img.classList.contains('effects__preview--none')) {
        effectLevelBar.style.display = 'none';
      } else if (img.classList.contains('effects__preview--chrome')) {
        img.style.filter = 'grayscale(1)';
      } else if (img.classList.contains('effects__preview--sepia')) {
        img.style.filter = 'sepia(1)';
      } else if (img.classList.contains('effects__preview--marvin')) {
        img.style.filter = 'invert(100%)';
      } else if (img.classList.contains('effects__preview--phobos')) {
        img.style.filter = 'blur(3px)';
      } else if (img.classList.contains('effects__preview--heat')) {
        img.style.filter = 'brightness(3)';
      }
      imgScaleOutput.value = '100%';
    });
  };

  var filterTogle = function () {
    for (var i = 0; i < effects.length; i++) {
      var button = effects[i];
      filterClickListener(button);
    }
  };

  filterTogle();

  // реализация слайдера эффектов

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
      effectLevelDepth.style.width = ((effectLevelPin.offsetLeft - shift) / 4.5) + '%';
      if (effectLevelPin.style.left.replace('px', '') < MIN_SLIDER_COORDS) {
        effectLevelPin.style.left = '0px';
        effectLevelDepth.style.width = '0%';
      } else if (effectLevelPin.style.left.replace('px', '') > MAX_SLIDER_COORDS) {
        effectLevelPin.style.left = '453px';
        effectLevelDepth.style.width = '100%';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // насыщеность эфекта в зависимости от положения слайдера

  effectLevelPin.addEventListener('mousedown', function () {

    var onMouseMove = function () {
      if (img.classList.contains('effects__preview--chrome')) {
        img.style.filter = 'grayscale(' + effectLevelDepth.style.width.replace('%', '') * 0.01 + ')';
        effectLevelValue.setAttribute('value', '' + effectLevelDepth.style.width.replace('%', '') * 0.01 + '');
      } else if (img.classList.contains('effects__preview--sepia')) {
        img.style.filter = 'sepia(' + effectLevelDepth.style.width.replace('%', '') * 0.01 + ')';
        effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '') * 0.01;
      } else if (img.classList.contains('effects__preview--marvin')) {
        img.style.filter = 'invert(' + effectLevelDepth.style.width + ')';
        effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '');
      } else if (img.classList.contains('effects__preview--phobos')) {
        img.style.filter = 'blur(' + effectLevelDepth.style.width.replace('%', '') * 0.03 + 'px' + ')';
        effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '') * 0.03 + 'px';
      } else if (img.classList.contains('effects__preview--heat')) {
        img.style.filter = 'brightness(' + ((effectLevelDepth.style.width.replace('%', '') * 0.02) + 1) + ')';
        effectLevelValue.textContent = ((effectLevelDepth.style.width.replace('%', '') * 0.02) + 1);
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // валидация поля хештегов

  var getArrToLowerCase = function (arr) {
    for (var index = 0; index < arr.length; index++) {
      arr[index] = arr[index].toLowerCase();
    }

    return arr;
  };

  var getDoudleSimbolError = function (string, simbol) {
    for (var ii = 1; ii < string.length; ii++) {
      if (string[ii].includes(simbol)) {
        return true;
      }
    }

    return false;
  };

  var getReplayHashtagError = function (hashtag, arr, currentIndex) {
    for (var j = 1; j < arr.length; j++) {
      if (hashtag === arr[currentIndex + j]) {
        return true;
      }
    }

    return false;
  };

  var getHashtagError = function () {
    var hashtags = hashtagInput.value.split(' ');
    var checkMaxHashtagsQuantity = (hashtags.length > MAX_TAGS);

    hashtags = getArrToLowerCase(hashtags);

    if (checkMaxHashtagsQuantity) {
      return 'не больше 5 хештегов';
    }

    for (var i = 0; i < hashtags.length; i++) {

      var currentHashtag = hashtags[i];
      var checkHashtagStart = (currentHashtag[0] !== undefined && currentHashtag[0] !== '#' || hashtags.length > 1 && currentHashtag[0] !== '#');
      var chekHashtagMinLength = (currentHashtag === '#');
      var chekHashtagMaxLength = (currentHashtag.length > HASHTAG_LENGTH);
      var checkHashtagReplay = (getReplayHashtagError(currentHashtag, hashtags, i));
      var checkHashtagSpace = (getDoudleSimbolError(currentHashtag, '#'));

      if (checkHashtagStart) {
        return 'все хештеги дожны начинаться с #';
      }

      if (chekHashtagMinLength) {
        return 'хештег не может состоять из одной #';
      }

      if (chekHashtagMaxLength) {
        return 'хештеги должны быть не больше 20 символов';
      }

      if (checkHashtagReplay) {
        return 'хештеги не должны повторяться';
      }
    }

    if (checkHashtagSpace) {
      return 'хештеги должны разделяться пробелом';
    }

    return '';
  };

  hashtagInput.addEventListener('input', function () {
    var message = getHashtagError();
    hashtagInput.setCustomValidity(message);
  });

  // загрузка изображения

  // показ окна успешной загрузки
  var getSuccessUpload = function () {
    var fragment = document.createDocumentFragment();
    var element = TemplateSuccess.cloneNode(true);
    var button = element.querySelector('.success__button');
    button.addEventListener('click', function () {
      element.classList.add('visually-hidden');
    });
    element.addEventListener('click', function (evt) {
      if (evt.target === element) {
        element.classList.add('visually-hidden');
      }
    });
    fragment.appendChild(element);
    window.main.appendChild(fragment);
  };

  var getErrorUpload = function () {
    var fragment = document.createDocumentFragment();
    var element = TemplateError.cloneNode(true);
    element.
  };

  var onSuccess = function () {
    imgUploadForm.reset();
    imgSetup.classList.add('hidden');
    getSuccessUpload();

  };

  var onError = function () {

  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.upLoad(new FormData(imgUploadForm), onSuccess, onError);
    evt.preventDefault();
  });

})();
