'use strict';

var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');

var PHOTOS_COUNT = 25;
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

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getComments = function (commentsNumber, message, name) {
  var arr = [];

  for (var i = 1; i < getRandom(1, commentsNumber); i++) {
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
        getRandom(1, 200),
        getComments(getRandom(1, 10), MESSAGES, USER_NAMES)
    );
  }

  return arr;
};

var userPosts = getMoks();

var getPosts = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var element = templatePicture.cloneNode(true);
    var pictureComment = templatePicture.querySelector('.picture__comments').cloneNode(true);
    var pictureLikes = templatePicture.querySelector('.picture__likes').cloneNode(true);

    element.querySelector('.picture__img').src = arr[i].url;
    element.querySelector('.picture__info').textContent = arr[i].description;
    element.querySelector('.picture__info').appendChild(pictureComment);
    element.querySelector('.picture__comments').textContent = arr[i].comments.length;
    element.querySelector('.picture__info').appendChild(pictureLikes);
    element.querySelector('.picture__likes').textContent = arr[i].likes;

    fragment.appendChild(element);
  }

  return fragment;
};

picturesList.appendChild(getPosts(userPosts));
