'use strict';

(function () {

  var MAX_RANDOM_QUANTITY = 10;

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
      if (evt.keyCode === window.data.ENTER_BUTTON) {
        filterButtons.forEach(function (element) {
          element.classList.remove('img-filters__button--active');
        });
        button.classList.add('img-filters__button--active');
      }
    });
  };

  var resetGallery = function () {
    var imageList = window.data.picturesList.querySelectorAll('.picture');
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

    window.data.picturesList.appendChild(window.gallery.getPosts(window.userPosts));
  };

  var onPopularButtonEnterPres = function (evt) {
    if (evt.keyCode === window.data.ENTER_BUTTON) {
      evt.preventDefault();

      resetGallery();

      window.data.picturesList.appendChild(window.gallery.getPosts(window.userPosts));
    }
  };

  var onRandomButtonClick = function (evt) {
    evt.preventDefault();

    resetGallery();
    var randomPhoto = window.userPosts.slice();
    window.data.shuffle(randomPhoto);
    randomPhoto = randomPhoto.slice(0, MAX_RANDOM_QUANTITY);

    window.data.picturesList.appendChild(window.gallery.getPosts(randomPhoto));
  };

  var onRandomButtonEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_BUTTON) {
      evt.preventDefault();

      resetGallery();
      var randomPhoto = window.userPosts.slice();
      window.data.shuffle(randomPhoto);
      randomPhoto = randomPhoto.slice(0, MAX_RANDOM_QUANTITY);

      window.data.picturesList.appendChild(window.gallery.getPosts(randomPhoto));
    }
  };

  var onDiscussedButtonClick = function (evt) {
    evt.preventDefault();
    window.renderGallery = window.userPosts.slice()
    .sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    resetGallery();

    window.data.picturesList.appendChild(window.gallery.getPosts(window.renderGallery));
  };

  var onDiscussedButtonEnterPress = function (evt) {
    if (evt.keyCode === window.data.ENTER_BUTTON) {
      evt.preventDefault();
      window.renderGallery = window.userPosts.slice()
      .sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      resetGallery();

      window.data.picturesList.appendChild(window.gallery.getPosts(window.renderGallery));
    }
  };

  // изначальный порядок фотографий
  popularButton.addEventListener('click', window.data.debounce(onPopularButtonClick));
  popularButton.addEventListener('keydown', window.data.debounce(onPopularButtonEnterPres));

  // случайные, не повторяющиеся 10 фотографии
  randomButton.addEventListener('click', window.data.debounce(onRandomButtonClick));
  randomButton.addEventListener('keydown', window.data.debounce(onRandomButtonEnterPress));

  // порядок по обсуждаемости
  discussedButton.addEventListener('click', window.data.debounce(onDiscussedButtonClick));
  discussedButton.addEventListener('keydown', window.data.debounce(onDiscussedButtonEnterPress));

})();
