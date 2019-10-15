'use strict';

(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var templateDataError = document.querySelector('#data-error').content.querySelector('.error');
  window.main = document.querySelector('main');

  // показ окна ошибки загрузки данных
  window.getDataError = function () {
    var fragment = document.createDocumentFragment();
    var element = templateDataError.cloneNode(true);
    var resetButton = element.querySelector('.error__button');
    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.location.reload();
    });
    fragment.appendChild(element);

    window.main.appendChild(fragment);
  };

  var onError = function () {
    window.getDataError();
  };

  var onSuccess = function (data) {
    window.userPosts = data;
    window.picturesList.appendChild(window.getPosts(window.userPosts));

  };

  // var tenplateEror = document.querySelector('#error');

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

  // window.userPosts = getMoks();

  // создание галлереи
  window.getPosts = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      var element = templatePicture.cloneNode(true);

      element.querySelector('.picture__img').src = arr[i].url;
      element.querySelector('.picture__comments').textContent = arr[i].comments.length;
      element.querySelector('.picture__likes').textContent = arr[i].likes;

      fragment.appendChild(element);
    }

    window.previewImg = fragment.querySelectorAll('.picture');

    window.previewImgListner();

    return fragment;
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);

})();
