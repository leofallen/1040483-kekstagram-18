'use strict';

(function () {

  var filtersContainer = document.querySelector('.img-filters');
  var filterButtons = filtersContainer.querySelectorAll('.img-filters__button');
  var discussedButton = filtersContainer.querySelector('#filter-discussed');
  var popularButton = filtersContainer.querySelector('#filter-popular');
  var randomButton = filtersContainer.querySelector('#filter-random');


  filtersContainer.classList.remove('img-filters--inactive');

  var getActivButton = function (button) {

    button.addEventListener('click', function () {
      filterButtons.forEach(function (element) {
        element.classList.remove('img-filters__button--active');
      });
      button.classList.add('img-filters__button--active');
    });

    button.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_BUTTON) {
        filterButtons.forEach(function (element) {
          element.classList.remove('img-filters__button--active');
        });
        button.classList.add('img-filters__button--active');
      }
    });
  };

  var resetGallery = function () {
    var imageList = window.picturesList.querySelectorAll('.picture');
    imageList.forEach(function (element) {
      element.remove();
    });
  };

  // переключение стиля кнопок сортировки галлереи
  filterButtons.forEach(function (element) {
    getActivButton(element);
  });


  var onPopularButtonClick = function (evt) {
    evt.preventDefault();

    resetGallery();

    window.picturesList.appendChild(window.getPosts(window.userPosts));
  };

  var onPopularButtonEnterPres = function (evt) {
    if (evt.keyCode === window.ENTER_BUTTON) {
      evt.preventDefault();

      resetGallery();

      window.picturesList.appendChild(window.getPosts(window.userPosts));
    }
  };

  var onRandomButtonClick = function (evt) {
    evt.preventDefault();

    resetGallery();
    var randomPhoto = window.userPosts.slice();
    window.shuffle(randomPhoto);
    randomPhoto = randomPhoto.slice(0, 10);

    window.picturesList.appendChild(window.getPosts(randomPhoto));
  };

  var onRandomButtonEnterPress = function (evt) {
    if (evt.keyCode === window.ENTER_BUTTON) {
      evt.preventDefault();

      resetGallery();
      var randomPhoto = window.userPosts.slice();
      window.shuffle(randomPhoto);
      randomPhoto = randomPhoto.slice(0, 10);

      window.picturesList.appendChild(window.getPosts(randomPhoto));
    }
  };

  var onDiscussedButtonClick = function (evt) {
    evt.preventDefault();
    window.gallery = window.userPosts.slice()
    .sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    resetGallery();

    window.picturesList.appendChild(window.getPosts(window.gallery));
  };

  var onDiscussedButtonEnterPress = function (evt) {
    if (evt.keyCode === window.ENTER_BUTTON) {
      evt.preventDefault();
      window.gallery = window.userPosts.slice()
      .sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      resetGallery();

      window.picturesList.appendChild(window.getPosts(window.gallery));
    }

  };

  // изначальный порядок фотографий
  popularButton.addEventListener('click', window.debounce(onPopularButtonClick));
  popularButton.addEventListener('keydown', window.debounce(onPopularButtonEnterPres));

  // случайные, не повторяющиеся 10 фотографии
  randomButton.addEventListener('click', window.debounce(onRandomButtonClick));
  randomButton.addEventListener('keydown', window.debounce(onRandomButtonEnterPress));

  // порядок по обсуждаемости
  discussedButton.addEventListener('click', window.debounce(onDiscussedButtonClick));
  discussedButton.addEventListener('keydown', window.debounce(onDiscussedButtonEnterPress));

})();
