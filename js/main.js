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

bigPicture.classList.remove('hidden');
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
