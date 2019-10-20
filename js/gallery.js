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
