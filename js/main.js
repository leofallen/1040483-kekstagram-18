'use strict';

var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
var picturesList = document.querySelector('.pictures');

var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var PHOTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
var DESCRIPTION = ['описание фотографии'];
var AVATARS = 'img/avatar-' + getRandom(1, 6) + '.svg';
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

var userPosts = [];

var makeMok = function () {

  var getComment = function (avatar, message, name) {
    return {
      avatar: avatar,
      message: message[getRandom(0, message.length - 1)],
      name: name[getRandom(0, name.length - 1)]
    };
  };

  var getComments = function (comments, length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr[i] = comments;
    }
    return arr;
  };

  var renderPhotos = function (photos, descriptions, likes, comments) {
    return {
      url: 'photos' + '/' + getRandom(1, photos.length) + '.jpg',
      description: descriptions[getRandom(0, descriptions.length - 1)],
      likes: likes,
      comments: comments
    };
  };

  for (var i = 0; i < PHOTOS.length; i++) {
    userPosts[i] = renderPhotos(PHOTOS, DESCRIPTION, getRandom(1, 200), getComments(getComment(AVATARS, MESSAGES, USER_NAMES), getRandom(0, 10)));
  }

  return userPosts;
};

userPosts = makeMok();

var fragment = document.createDocumentFragment();
for (var i = 0; i < userPosts.length; i++) {
  var element = templatePicture.cloneNode(true);
  var pictureComment = templatePicture.querySelector('.picture__comments').cloneNode(true);
  var pictureLikes = templatePicture.querySelector('.picture__likes').cloneNode(true);

  element.querySelector('.picture__img').src = userPosts[i].url;
  element.querySelector('.picture__info').textContent = userPosts[i].description;
  element.querySelector('.picture__info').appendChild(pictureComment);
  element.querySelector('.picture__comments').textContent = userPosts[i].comments.length;
  element.querySelector('.picture__info').appendChild(pictureLikes);
  element.querySelector('.picture__likes').textContent = userPosts[i].likes;

  fragment.appendChild(element);
}

picturesList.appendChild(fragment);
