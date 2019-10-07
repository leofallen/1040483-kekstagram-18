'use strict';

// var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
// var picturesList = document.querySelector('.pictures');
// var bigPicture = document.querySelector('.big-picture');
// var bigImg = bigPicture.querySelector('img');
// var bigPictureImg = bigPicture.querySelector('.big-picture__img')
// .querySelector('img');
// var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
// var bigPictureSocial = document.querySelector('.big-picture__social');
// var bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');
// var bigPictureCommentCount = bigPictureSocial.querySelector('.comments-count');
// var bigPictureCommentsList = bigPictureSocial.querySelector('.social__comments');
// var bigPictureImgDescription = bigPictureSocial.querySelector('.social__caption');
// var socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
// var commentLoader = bigPictureSocial.querySelector('.comments-loader');
// var upLoader = window.picturesList.querySelector('#upload-file');
// var imgSetup = window.picturesList.querySelector('.img-upload__overlay');
// var imgScaleOutput = window.picturesList.querySelector('.scale__control--value');
// var imgScaleSmall = window.picturesList.querySelector('.scale__control--smaller');
// var imgScaleBig = window.picturesList.querySelector('.scale__control--bigger');
// var img = window.picturesList.querySelector('.img-upload__preview').querySelector('img');
// var imgSetupButtonClose = window.picturesList.querySelector('.img-upload__cancel');
// var effects = window.picturesList.querySelectorAll('.effects__radio');
// var effectLevelValue = window.picturesList.querySelector('.effect-level__value');
// var effectLevelPin = window.picturesList.querySelector('.effect-level__pin');
// var effectLevelDepth = window.picturesList.querySelector('.effect-level__depth');
// var effectLevelBar = window.picturesList.querySelector('.img-upload__effect-level');
// var imgUploadForm = window.picturesList.querySelector('.img-upload__form');
// var hashtagInput = window.picturesList.querySelector('.text__hashtags');
// var commentInput = window.picturesList.querySelector('.text__description');
// var commentLoaderInput = bigPicture.querySelector('.social__footer-text');


// var PHOTOS_COUNT = 25;
// var COMMENTS_COUNT = 10;
// var LIKES_COUNT = 200;
// var AVATARS = 6;
// var DESCRIPTION = ['описание фотографии'];
// var MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
// ];
// var USER_NAMES = [
//   'Friedrich_Nietzsche',
//   'Глаша',
//   'Stiven_Sigal',
//   'SAURON',
//   'Varg_Vikernes',
//   'Филипп_Бедросович'
// ];
// var IMG_MIN_SIZE = 25;
// var IMG_MAX_SIZE = 100;
// var ESC_BUTTON = 27;
// var MIN_SLIDER_COORDS = 0;
// var MAX_SLIDER_COORDS = 453;
// var ENTER_BUTTON = 13;
// var MAX_TAGS = 5;
// var HASHTAG_LENGTH = 20;

// var getComments = function (commentsNumber, message, name) {
//   var arr = [];
//   for (var i = 0; i < window.getRandom(1, commentsNumber); i++) {
//     for (var j = 0; j < commentsNumber; j++) {
//       arr[j] = {
//         avatar: 'img/avatar-' + window.getRandom(1, AVATARS) + '.svg',
//         message: message[window.getRandom(0, message.length - 1)],
//         name: name[window.getRandom(0, name.length - 1)]
//       };
//     }
//   }

//   return arr;
// };

// var renderPhotos = function (photoNumber, descriptions, likes, comments) {
//   return {
//     url: 'photos' + '/' + photoNumber + '.jpg',
//     description: descriptions[window.getRandom(0, descriptions.length - 1)],
//     likes: likes,
//     comments: comments
//   };
// };

// var getMoks = function () {
//   var arr = [];
//   for (var i = 0; i < PHOTOS_COUNT; i++) {
//     arr[i] = renderPhotos(
//         i + 1,
//         DESCRIPTION,
//         window.getRandom(1, LIKES_COUNT),
//         getComments(window.getRandom(1, COMMENTS_COUNT), MESSAGES, USER_NAMES)
//     );
//   }

//   return arr;
// };

// var userPosts = getMoks();

// создание постов и встраивание их в разметку

// var getPosts = function (arr) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < arr.length; i++) {
//     var element = templatePicture.cloneNode(true);

//     element.querySelector('.picture__img').src = arr[i].url;
//     element.querySelector('.picture__comments').textContent = arr[i].comments.length;
//     element.querySelector('.picture__likes').textContent = arr[i].likes;

//     fragment.appendChild(element);
//   }

//   return fragment;
// };

// picturesList.appendChild(getPosts(window.userPosts));

// показ и закарытие, создание коментария и размещение его в разметке, для большой картинки

var previewImg = picturesList.querySelectorAll('.picture');

var bigImageOpen = function (index) {
  bigImg.src = 'photos/' + index + '.jpg';
  bigPictureLikesCount.textContent = userPosts[index - 1].likes;
  bigPictureImgDescription.textContent = userPosts[index].description;
  bigPicture.classList.remove('hidden');
};

var onPrewievClick = function (element, index) {
  element.addEventListener('click', function () {
    bigImageOpen(index);
  });
};

var onPrewievEnterKeydown = function (element, index) {
  element.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_BUTTON) {
      bigImageOpen(index);
    }
  });
};

var getComment = function (globIndex, localIndex) {
  var commentElement = document.createElement('li');
  var commentElementImg = document.createElement('img');
  var commentElementText = document.createElement('p');

  commentElement.className = 'social__comment';
  commentElementImg.className = 'social__picture';
  commentElementText.className = 'social__text';

  commentElementImg.src = userPosts[globIndex].comments[localIndex].avatar;
  commentElementImg.alt = userPosts[globIndex].comments[localIndex].name;
  commentElementText.textContent = userPosts[globIndex].comments[localIndex].message;

  commentElement.appendChild(commentElementImg);
  commentElement.appendChild(commentElementText);

  return commentElement;
};

socialCommentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');

var onBigPictureButtonCloseClick = function (evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  bigPictureCommentsList.innerHTML = '';
};

var onBigpictureEscPress = function (evt) {
  if (evt.keyCode === ESC_BUTTON) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    bigPictureCommentsList.innerHTML = '';
  }
};

bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
document.addEventListener('keydown', onBigpictureEscPress);

var getBigPictureComment = function (element, arr, globIndex) {
  element.addEventListener('click', function () {
    for (var ii = 0; ii < arr.comments.length; ii++) {
      bigPictureCommentsList.appendChild(getComment(globIndex, ii));
    }
  });
};

for (var iii = 0; iii < previewImg.length; iii++) {
  onPrewievClick(previewImg[iii], iii + 1);
  onPrewievEnterKeydown(previewImg[iii], iii + 1);
  getBigPictureComment(previewImg[iii], userPosts[iii], iii);
}

commentLoaderInput.addEventListener('focusin', function () {
  bigPictureClose.removeEventListener('click', onBigPictureButtonCloseClick);
  document.removeEventListener('keydown', onBigpictureEscPress);
});

commentLoaderInput.addEventListener('focusout', function () {
  bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
  document.addEventListener('keydown', onBigpictureEscPress);
});

// открытие и закрытие формы загрузки и редактирования фото

<<<<<<< HEAD
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
  if (evt.keyCode === ESC_BUTTON) {
    imgSetup.classList.add('hidden');
    imgSetupReset();
    imgUploadForm.reset();
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

var addClickListener = function (button) {
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

for (var i = 0; i < effects.length; i++) {
  var button = effects[i];
  addClickListener(button);
}

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

var getDoubleHashtagError = function (hashtag, arr, currentIndex) {
  for (var j = 1; j < arr.length; j++) {
    if (hashtag === arr[currentIndex + j]) {
      return true;
    }
  }

  return false;
};

var getHashtagError = function () {
  var hashtags = hashtagInput.value.split(' ');

  hashtags = getArrToLowerCase(hashtags);

  if (hashtags.length > MAX_TAGS) {
    return 'не больше 5 хештегов';
  }

  for (var ind = 0; ind < hashtags.length; ind++) {
    var currentHashtag = hashtags[ind];

    if (
      currentHashtag[0] !== undefined
      && currentHashtag[0] !== '#'
      || hashtags.length > 1
      && currentHashtag[0] !== '#'
    ) {
      return 'все хештеги дожны начинаться с #';
    }

    if (currentHashtag === '#') {
      return 'хештег не может состоять из одной #';
    }

    if (currentHashtag.length > HASHTAG_LENGTH) {
      return 'хештеги должны быть не больше 20 символов';
    }

    if (getDoubleHashtagError(currentHashtag, hashtags, ind)) {
      return 'хештеги не должны повторяться';
    }
  }

  if (getDoudleSimbolError(currentHashtag, '#')) {
    return 'хештеги должны разделяться пробелом';
  }

  return '';
};

hashtagInput.addEventListener('input', function () {
  var message = getHashtagError();
  hashtagInput.setCustomValidity(message);
});
=======
// var onUpLoaderChange = function () {
//   imgSetup.classList.remove('hidden');
//   document.addEventListener('keydown', onImgSetupEscPress);
// };

// var imgSetupReset = function () {
//   img.style.transform = 'scale(1)';
//   imgScaleOutput.value = '100%';
//   img.removeAttribute('style');
//   img.removeAttribute('class');
//   effectLevelPin.style.left = '453px';
//   effectLevelDepth.style.width = '100%';
// };

// var onImgSetupEscPress = function (evt) {
//   if (evt.keyCode === 27) {
//     imgSetup.classList.add('hidden');
//     imgSetupReset();
//     imgUploadForm.reset();
//   }
// };

// var imgSetupClose = function () {
//   imgSetup.classList.add('hidden');
//   document.removeEventListener('keydown', onImgSetupEscPress);
//   imgSetupReset();
// };

// upLoader.addEventListener('change', onUpLoaderChange);
// imgSetupButtonClose.addEventListener('click', imgSetupClose);
// hashtagInput.addEventListener('focusin', function () {
//   document.removeEventListener('keydown', onImgSetupEscPress);
// });
// hashtagInput.addEventListener('focusout', function () {
//   document.addEventListener('keydown', onImgSetupEscPress);
// });
// commentInput.addEventListener('focusin', function () {
//   document.removeEventListener('keydown', onImgSetupEscPress);
// });
// commentInput.addEventListener('focusout', function () {
//   document.addEventListener('keydown', onImgSetupEscPress);
// });

// // мастшабирование фотографии

// img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';

// imgScaleSmall.addEventListener('click', function () {
//   if (imgScaleOutput.value.replace('%', '') > IMG_MIN_SIZE) {
//     var numValue = (imgScaleOutput.value.replace('%', ''));
//     imgScaleOutput.value = numValue - IMG_MIN_SIZE;
//     img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';
//     imgScaleOutput.value = imgScaleOutput.value + '%';
//   }
// });

// imgScaleBig.addEventListener('click', function () {
//   if (imgScaleOutput.value.replace('%', '') < IMG_MAX_SIZE) {
//     var numValue = (imgScaleOutput.value.replace('%', ''));
//     imgScaleOutput.value = Number(numValue) + IMG_MIN_SIZE;
//     img.style.transform = 'scale(' + imgScaleOutput.value.replace('%', '') * 0.01 + ')';
//     imgScaleOutput.value = imgScaleOutput.value + '%';
//   }
// });

// переключение фильтров для фото

// var addClickListener = function (button) {
//   button.addEventListener('click', function () {
//     img.className = 'effects__preview--' + button.value;
//     img.removeAttribute('style');
//     effectLevelPin.style.left = '453px';
//     effectLevelDepth.style.width = '100%';
//     effectLevelBar.removeAttribute('style');
//     if (img.classList.contains('effects__preview--none')) {
//       effectLevelBar.style.display = 'none';
//     } else if (img.classList.contains('effects__preview--chrome')) {
//       img.style.filter = 'grayscale(1)';
//     } else if (img.classList.contains('effects__preview--sepia')) {
//       img.style.filter = 'sepia(1)';
//     } else if (img.classList.contains('effects__preview--marvin')) {
//       img.style.filter = 'invert(100%)';
//     } else if (img.classList.contains('effects__preview--phobos')) {
//       img.style.filter = 'blur(3px)';
//     } else if (img.classList.contains('effects__preview--heat')) {
//       img.style.filter = 'brightness(3)';
//     }
//     imgScaleOutput.value = '100%';
//   });
// };

// for (var i = 0; i < effects.length; i++) {
//   var button = effects[i];
//   addClickListener(button);
// }

// // реализация слайдера эффектов

// effectLevelPin.addEventListener('mousedown', function (evt) {
//   evt.preventDefault();

//   var startCoords = evt.clientX;

//   var onMouseMove = function (moveEvt) {
//     moveEvt.preventDefault();
//     var shift = startCoords - moveEvt.clientX;
//     startCoords = moveEvt.clientX;
//     effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
//     effectLevelDepth.style.width = ((effectLevelPin.offsetLeft - shift) / 4.5) + '%';
//     if (effectLevelPin.style.left.replace('px', '') < MIN_SLIDER_COORDS) {
//       effectLevelPin.style.left = '0px';
//       effectLevelDepth.style.width = '0%';
//     } else if (effectLevelPin.style.left.replace('px', '') > MAX_SLIDER_COORDS) {
//       effectLevelPin.style.left = '453px';
//       effectLevelDepth.style.width = '100%';
//     }
//   };

//   var onMouseUp = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// });

// // насыщеность эфекта в зависимости от положения слайдера

// effectLevelPin.addEventListener('mousedown', function () {

//   var onMouseMove = function () {
//     if (img.classList.contains('effects__preview--chrome')) {
//       img.style.filter = 'grayscale(' + effectLevelDepth.style.width.replace('%', '') * 0.01 + ')';
//       effectLevelValue.setAttribute('value', '' + effectLevelDepth.style.width.replace('%', '') * 0.01 + '');
//     } else if (img.classList.contains('effects__preview--sepia')) {
//       img.style.filter = 'sepia(' + effectLevelDepth.style.width.replace('%', '') * 0.01 + ')';
//       effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '') * 0.01;
//     } else if (img.classList.contains('effects__preview--marvin')) {
//       img.style.filter = 'invert(' + effectLevelDepth.style.width + ')';
//       effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '');
//     } else if (img.classList.contains('effects__preview--phobos')) {
//       img.style.filter = 'blur(' + effectLevelDepth.style.width.replace('%', '') * 0.03 + 'px' + ')';
//       effectLevelValue.textContent = effectLevelDepth.style.width.replace('%', '') * 0.03 + 'px';
//     } else if (img.classList.contains('effects__preview--heat')) {
//       img.style.filter = 'brightness(' + ((effectLevelDepth.style.width.replace('%', '') * 0.02) + 1) + ')';
//       effectLevelValue.textContent = ((effectLevelDepth.style.width.replace('%', '') * 0.02) + 1);
//     }
//   };

//   var onMouseUp = function () {
//     document.removeEventListener('mousemove', onMouseMove);
//   };

//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// });

// // валидация поля хештегов

// var getArrToLowerCase = function (arr) {
//   for (var index = 0; index < arr.length; index++) {
//     arr[index] = arr[index].toLowerCase();
//   }

//   return arr;
// };

// var getDoudleSimbolError = function (string, simbol) {
//   for (var ii = 1; ii < string.length; ii++) {
//     if (string[ii].includes(simbol)) {
//       return true;
//     }
//   }

//   return false;
// };

// var getDoubleHashtagError = function (hashtag, arr, currentIndex) {
//   for (var j = 1; j < arr.length; j++) {
//     if (hashtag === arr[currentIndex + j]) {
//       return true;
//     }
//   }

//   return false;
// };

// var getHashtagError = function () {
//   var hashtags = hashtagInput.value.split(' ');

//   hashtags = getArrToLowerCase(hashtags);

//   if (hashtags.length > MAX_TAGS) {
//     return 'не больше 5 хештегов';
//   }

//   for (var ind = 0; ind < hashtags.length; ind++) {
//     var currentHashtag = hashtags[ind];

//     if (
//       currentHashtag[0] !== undefined
//       && currentHashtag[0] !== '#'
//       || hashtags.length > 1
//       && currentHashtag[0] !== '#'
//     ) {
//       return 'все хештеги дожны начинаться с #';
//     }

//     if (currentHashtag === '#') {
//       return 'хештег не может состоять из одной #';
//     }

//     if (currentHashtag.length > HASHTAG_LENGTH) {
//       return 'хештеги должны быть не больше 20 символов';
//     }

//     if (getDoubleHashtagError(currentHashtag, hashtags, ind)) {
//       return 'хештеги не должны повторяться';
//     }
//   }

//   if (getDoudleSimbolError(currentHashtag, '#')) {
//     return 'хештеги должны разделяться пробелом';
//   }

//   return '';
// };

// hashtagInput.addEventListener('input', function () {
//   var message = getHashtagError();
//   hashtagInput.setCustomValidity(message);
// });

// var prewievImg = window.picturesList.querySelectorAll('.picture');

// var bigImageOpen = function (index) {
//   bigImg.src = 'photos/' + index + '.jpg';
//   bigPictureLikesCount.textContent = window.userPosts[index - 1].likes;
//   bigPictureImgDescription.textContent = window.userPosts[0].description;
//   bigPicture.classList.remove('hidden');
// };

// var onPrewievClick = function (element, index) {
//   element.addEventListener('click', function () {
//     bigImageOpen(index);
//   });
// };

// var onPrewievKeydown = function (element, index) {
//   element.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === ENTER_BUTTON) {
//       bigImageOpen(index);
//     }
//   });
// };

// // показ и закарытие, создание коментария и размещение его в разметке, для большой картинки

// var getComment = function (globIndex, localIndex) {
//   var commentElement = document.createElement('li');
//   var commentElementImg = document.createElement('img');
//   var commentElementText = document.createElement('p');

//   commentElement.className = 'social__comment';
//   commentElementImg.className = 'social__picture';
//   commentElementText.className = 'social__text';

//   commentElementImg.src = window.userPosts[globIndex].comments[localIndex].avatar;
//   commentElementImg.alt = window.userPosts[globIndex].comments[localIndex].name;
//   commentElementText.textContent = window.userPosts[globIndex].comments[localIndex].message;

//   commentElement.appendChild(commentElementImg);
//   commentElement.appendChild(commentElementText);

//   return commentElement;
// };

// socialCommentCount.classList.add('visually-hidden');
// commentLoader.classList.add('visually-hidden');

// var onBigPictureButtonCloseClick = function (evt) {
//   evt.preventDefault();
//   bigPicture.classList.add('hidden');
//   bigPictureCommentsList.innerHTML = '';
// };

// var onBigpictureEscPress = function (evt) {
//   if (evt.keyCode === ESC_BUTTON) {
//     evt.preventDefault();
//     bigPicture.classList.add('hidden');
//     bigPictureCommentsList.innerHTML = '';
//   }
// };

// bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
// document.addEventListener('keydown', onBigpictureEscPress);

// var getBigPictureComment = function (element, arr, globIndex) {
//   element.addEventListener('click', function () {
//     for (var ii = 0; ii < arr.comments.length; ii++) {
//       bigPictureCommentsList.appendChild(getComment(globIndex, ii));
//     }
//   });
// };

// for (var iii = 0; iii < prewievImg.length; iii++) {
//   onPrewievClick(prewievImg[iii], iii + 1);
//   onPrewievKeydown(prewievImg[iii], iii + 1);
//   getBigPictureComment(prewievImg[iii], window.userPosts[iii], iii);
// }

// commentLoaderInput.addEventListener('focusin', function () {
//   bigPictureClose.removeEventListener('click', onBigPictureButtonCloseClick);
//   document.removeEventListener('keydown', onBigpictureEscPress);
// });

// commentLoaderInput.addEventListener('focusout', function () {
//   bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
//   document.addEventListener('keydown', onBigpictureEscPress);
// });
>>>>>>> разбил код на модули
