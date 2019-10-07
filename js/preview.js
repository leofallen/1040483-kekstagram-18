'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigImg = bigPicture.querySelector('img');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureSocial = document.querySelector('.big-picture__social');
  var bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');
  var bigPictureCommentsList = bigPictureSocial.querySelector('.social__comments');
  var bigPictureImgDescription = bigPictureSocial.querySelector('.social__caption');
  var socialCommentCount = bigPictureSocial.querySelector('.social__comment-count');
  var commentLoader = bigPictureSocial.querySelector('.comments-loader');
  var commentLoaderInput = bigPicture.querySelector('.social__footer-text');
  var prewievImg = window.picturesList.querySelectorAll('.picture');

  var bigImageOpen = function (index) {
    bigImg.src = 'photos/' + index + '.jpg';
    bigPictureLikesCount.textContent = window.userPosts[index - 1].likes;
    bigPictureImgDescription.textContent = window.userPosts[0].description;
    bigPicture.classList.remove('hidden');
  };

  var onPrewievClick = function (element, index) {
    element.addEventListener('click', function () {
      bigImageOpen(index);
    });
  };

  var onPrewievKeydown = function (element, index) {
    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_BUTTON) {
        bigImageOpen(index);
      }
    });
  };

  // показ и закарытие, создание коментария и размещение его в разметке, для большой картинки

  var getComment = function (globIndex, localIndex) {
    var commentElement = document.createElement('li');
    var commentElementImg = document.createElement('img');
    var commentElementText = document.createElement('p');

    commentElement.className = 'social__comment';
    commentElementImg.className = 'social__picture';
    commentElementText.className = 'social__text';

    commentElementImg.src = window.userPosts[globIndex].comments[localIndex].avatar;
    commentElementImg.alt = window.userPosts[globIndex].comments[localIndex].name;
    commentElementText.textContent = window.userPosts[globIndex].comments[localIndex].message;

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
    if (evt.keyCode === window.ESC_BUTTON) {
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

  for (var iii = 0; iii < prewievImg.length; iii++) {
    onPrewievClick(prewievImg[iii], iii + 1);
    onPrewievKeydown(prewievImg[iii], iii + 1);
    getBigPictureComment(prewievImg[iii], window.userPosts[iii], iii);
  }

  commentLoaderInput.addEventListener('focusin', function () {
    bigPictureClose.removeEventListener('click', onBigPictureButtonCloseClick);
    document.removeEventListener('keydown', onBigpictureEscPress);
  });

  commentLoaderInput.addEventListener('focusout', function () {
    bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
    document.addEventListener('keydown', onBigpictureEscPress);
  });

})();
