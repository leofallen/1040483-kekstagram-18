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
  var maxCommentsView = bigPicture.querySelector('.comments-count');
  var commentLoader = bigPictureSocial.querySelector('.comments-loader');
  var commentLoaderInput = bigPicture.querySelector('.social__footer-text');
  var commentsList = bigPictureCommentsList.children;


  var COMMENTS_VISIBILITY = 5;
  var MAX_COMMENTS_VISIBILITY = COMMENTS_VISIBILITY;

  var bigImageOpen = function (globeArr, index) {
    bigImg.src = globeArr[index - 1].url;
    bigPictureLikesCount.textContent = globeArr[index - 1].likes;
    bigPictureImgDescription.textContent = globeArr[index - 1].description;
    bigPicture.classList.remove('hidden');
    maxCommentsView.textContent = globeArr[index - 1].comments.length;
    socialCommentCount.classList.remove('visually-hidden');
    commentLoader.classList.remove('visually-hidden');
    if (globeArr[index - 1].comments.length < 5) {
      socialCommentCount.classList.add('visually-hidden');
      commentLoader.classList.add('visually-hidden');
    }
  };

  var onPreviewClick = function (element, index, globeArr) {
    element.addEventListener('click', function () {
      bigImageOpen(globeArr, index);
    });
  };

  var onPreviewEnterKeydown = function (element, index, globeArr) {
    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ENTER_BUTTON) {
        bigImageOpen(globeArr, index);
      }
    });
  };

  // показ и закарытие, создание коментария и размещение его в разметке, для большой картинки

  var getComment = function (globIndex, localIndex, globeArr) {
    var commentElement = document.createElement('li');
    var commentElementImg = document.createElement('img');
    var commentElementText = document.createElement('p');

    commentElement.className = 'social__comment visually-hidden';
    commentElementImg.className = 'social__picture';
    commentElementText.className = 'social__text';

    commentElementImg.src = globeArr[globIndex].comments[localIndex].avatar;
    commentElementImg.alt = globeArr[globIndex].comments[localIndex].name;
    commentElementText.textContent = globeArr[globIndex].comments[localIndex].message;

    commentElement.appendChild(commentElementImg);
    commentElement.appendChild(commentElementText);

    return commentElement;
  };

  var onBigPictureButtonCloseClick = function (evt) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    bigPictureCommentsList.innerHTML = '';
    MAX_COMMENTS_VISIBILITY = COMMENTS_VISIBILITY;
  };

  var onBigpictureEscPress = function (evt) {
    if (evt.keyCode === window.ESC_BUTTON) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      bigPictureCommentsList.innerHTML = '';
      MAX_COMMENTS_VISIBILITY = COMMENTS_VISIBILITY;
    }
  };

  var onOverlayCloseClick = function (evt) {
    if (evt.target === bigPicture) {
      bigPicture.classList.add('hidden');
      bigPictureCommentsList.innerHTML = '';
      MAX_COMMENTS_VISIBILITY = COMMENTS_VISIBILITY;
    }
  };

  bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
  document.addEventListener('keydown', onBigpictureEscPress);
  bigPicture.addEventListener('click', onOverlayCloseClick);

  var getBigPictureComment = function (element, arr, globIndex, globeArr) {
    element.addEventListener('click', function () {
      for (var i = 0; i < arr.comments.length; i++) {
        bigPictureCommentsList.appendChild(getComment(globIndex, i, globeArr));
      }
      addCommentsVisibility();
      getCommentCount(MAX_COMMENTS_VISIBILITY, commentsList.length);
    });
  };

  // ограничение видимости коментариев
  var addCommentsVisibility = function () {
    if (commentsList.length < COMMENTS_VISIBILITY) {
      MAX_COMMENTS_VISIBILITY = commentsList.length;
    }

    for (var i = 0; i < MAX_COMMENTS_VISIBILITY; i++) {
      commentsList[i].classList.remove('visually-hidden');
    }
  };

  // добавить больше комментариев
  var addMoreComents = function () {
    MAX_COMMENTS_VISIBILITY += COMMENTS_VISIBILITY;

    if (MAX_COMMENTS_VISIBILITY >= commentsList.length) {
      MAX_COMMENTS_VISIBILITY = commentsList.length;
      commentLoader.classList.add('visually-hidden');
    }

    for (var i = 0; i < MAX_COMMENTS_VISIBILITY; i++) {
      commentsList[i].classList.remove('visually-hidden');
    }

    getCommentCount(MAX_COMMENTS_VISIBILITY, commentsList.length);

  };

  // сколько комментариев из скольки показано
  var getCommentCount = function (firstNumber, secondNumber) {
    socialCommentCount.innerHTML =
    '' + firstNumber + ''
    + ' из ' + '<span class="comments-count">'
    + secondNumber + '</span>' + ' коментариев';
  };

  commentLoader.addEventListener('click', addMoreComents);


  window.previewImgListner = function (arr) {
    for (var i = 0; i < window.previewImg.length; i++) {
      onPreviewClick(window.previewImg[i], i + 1, arr);
      onPreviewEnterKeydown(window.previewImg[i], i + 1, arr);
      getBigPictureComment(window.previewImg[i], arr[i], i, arr);
    }
  };

  commentLoaderInput.addEventListener('focusin', function () {
    bigPictureClose.removeEventListener('click', onBigPictureButtonCloseClick);
    document.removeEventListener('keydown', onBigpictureEscPress);
  });

  commentLoaderInput.addEventListener('focusout', function () {
    bigPictureClose.addEventListener('click', onBigPictureButtonCloseClick);
    document.addEventListener('keydown', onBigpictureEscPress);
  });

})();

