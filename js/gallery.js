'use strict';

(function () {
  var templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  var templateDataError = document.querySelector('#data-error').content.querySelector('.error');

  window.gallery = {
    main: document.querySelector('main'),

    // создание галлереи

    getPosts: function (arr) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arr.length; i++) {
        var element = templatePicture.cloneNode(true);

        element.querySelector('.picture__img').src = arr[i].url;
        element.querySelector('.picture__comments').textContent = arr[i].comments.length;
        element.querySelector('.picture__likes').textContent = arr[i].likes;

        fragment.appendChild(element);
      }

      window.previewImg = fragment.querySelectorAll('.picture');

      window.previewImgListner(arr);

      return fragment;
    }

  };

  // показ окна ошибки загрузки данных
  var getDataError = function () {
    var fragment = document.createDocumentFragment();
    var element = templateDataError.cloneNode(true);
    var resetButton = element.querySelector('.error__button');
    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.location.reload();
    });
    fragment.appendChild(element);
    window.gallery.main.appendChild(fragment);
  };


  var onError = function () {
    getDataError();
  };

  var onSuccess = function (data) {
    window.userPosts = data;
    window.data.picturesList.appendChild(window.gallery.getPosts(window.userPosts));
  };

  var xhr = window.data.getXHR();

  window.data.getLoading(
      xhr,
      onSuccess,
      onError,
      'GET',
      'https://js.dump.academy/kekstagram/data'
  );

})();
