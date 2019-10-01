'use strict';

var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img')
.querySelector('img');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var bigPictureSocial = document.querySelector('.big-picture__social');
var bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');
var bigPictureCommentCount = bigPictureSocial.querySelector('.comments-count');
var bigPictureCommentsList = bigPictureSocial.querySelector('.social__comments');
var bigPictureImgDescription = bigPictureSocial.querySelector('.social__caption');
var socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
var commentLoader = bigPictureSocial.querySelector('.comments-loader');
var upLoader = picturesList.querySelector('#upload-file');
var imgSetup = picturesList.querySelector('.img-upload__overlay');
var imgScaleOutput = picturesList.querySelector('.scale__control--value');
var imgScaleSmall = picturesList.querySelector('.scale__control--smaller');
var imgScaleBig = picturesList.querySelector('.scale__control--bigger');
var img = picturesList.querySelector('.img-upload__preview').querySelector('img');
var imgSetupButtonClose = picturesList.querySelector('.img-upload__cancel');
var effects = picturesList.querySelectorAll('.effects__radio');
var effectLevelValue = picturesList.querySelector('.effect-level__value');
var effectLevelPin = picturesList.querySelector('.effect-level__pin');
var effectLevelDepth = picturesList.querySelector('.effect-level__depth');
var effectLevelBar = picturesList.querySelector('.img-upload__effect-level');

var PHOTOS_COUNT = 25;
var COMMENTS_COUNT = 10;
var LIKES_COUNT = 200;
var AVATARS = 6;
var DESCRIPTION = ['описание фотографии'];
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var USER_NAMES = [
  'Friedrich_Nietzsche',
  'Глаша',
  'Stiven_Sigal',
  'SAURON',
  'Varg_Vikernes',
  'Филипп_Бедросович'
];
var IMG_MIN_SIZE = 25;
var IMG_MAX_SIZE = 100;

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getComments = function (commentsNumber, message, name) {
  var arr = [];
  for (var i = 0; i < getRandom(1, commentsNumber); i++) {
    for (var j = 0; j < commentsNumber; j++) {
      arr[j] = {
        avatar: 'img/avatar-' + getRandom(1, AVATARS) + '.svg',
        message: message[getRandom(0, message.length - 1)],
        name: name[getRandom(0, name.length - 1)]
      };
    }
  }

  return arr;
};

var renderPhotos = function (photoNumber, descriptions, likes, comments) {
  return {
    url: 'photos' + '/' + photoNumber + '.jpg',
    description: descriptions[getRandom(0, descriptions.length - 1)],
    likes: likes,
    comments: comments
  };
};

var getMoks = function () {
  var arr = [];
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    arr[i] = renderPhotos(
        i + 1,
        DESCRIPTION,
        getRandom(1, LIKES_COUNT),
        getComments(getRandom(1, COMMENTS_COUNT), MESSAGES, USER_NAMES)
    );
  }

  return arr;
};

var userPosts = getMoks();

var getPosts = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var element = templatePicture.cloneNode(true);

    element.querySelector('.picture__img').src = arr[i].url;
    element.querySelector('.picture__comments').textContent = arr[i].comments.length;
    element.querySelector('.picture__likes').textContent = arr[i].likes;

    fragment.appendChild(element);
  }

  return fragment;
};

picturesList.appendChild(getPosts(userPosts));

// bigPicture.classList.remove('hidden');
bigPictureClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

bigPictureImg.src = userPosts[0].url;
bigPictureLikesCount.textContent = userPosts[0].likes;
bigPictureCommentCount.textContent = userPosts[0].comments.length;
bigPictureImgDescription.textContent = userPosts[0].description;

var getComment = function () {
  var commentElement = document.createElement('li');
  var commentElementImg = document.createElement('img');
  var commentElementText = document.createElement('p');

  commentElement.className = 'social__comment';
  commentElementImg.className = 'social__picture';
  commentElementText.className = 'social__text';

  commentElementImg.src = userPosts[0].comments[0].avatar;
  commentElementImg.alt = userPosts[0].comments[0].name;
  commentElementText.textContent = userPosts[0].comments[0].message;

  commentElement.appendChild(commentElementImg);
  commentElement.appendChild(commentElementText);

  return commentElement;
};

var commentItem = getComment();

bigPictureCommentsList.appendChild(commentItem);

socialCommentCount.classList.add('visually-hidden');
commentLoader.classList.add('visually-hidden');

upLoader.addEventListener('change', function () {
  imgSetup.classList.remove('hidden');
  document.addEventListener('keydown', onImgSetupEscPress);
});

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

imgSetupButtonClose.addEventListener('click', function () {
  imgSetup.classList.add('hidden');
  img.style.transform = 'scale(1)';
});

var onImgSetupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    imgSetup.classList.add('hidden');
    img.style.transform = 'scale(1)';
    imgScaleOutput.value = '100%';
  }
};

var imgSetupClose = function () {
  imgSetup.classList.add('hidden');
  document.removeEventListener('keydown', onImgSetupEscPress);
};

imgSetupButtonClose.addEventListener('click', imgSetupClose);

imgSetupButtonClose.addEventListener('keydown', imgSetupClose);

var addClickListener = function (button) {
  button.addEventListener('click', function () {
    img.className = 'effects__preview--' + button.value;
    img.removeAttribute('style');
    effectLevelPin.style.left = '453px';
    effectLevelDepth.style.width = '100%';
    effectLevelBar.removeAttribute('style');
    if (img.classList.contains('effects__preview--none')) {
      effectLevelBar.style.display = 'none';
    }
  });
};

for (var i = 0; i < effects.length; i++) {
  var button = effects[i];
  addClickListener(button);
}

effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = startCoords - moveEvt.clientX;
    startCoords = moveEvt.clientX;
    effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift) + 'px';
    effectLevelDepth.style.width = ((effectLevelPin.offsetLeft - shift) / 4.5) + '%';
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


effectLevelPin.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', function () {
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
  });
});
