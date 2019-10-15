'use strict';

(function () {

  window.picturesList = document.querySelector('.pictures');

  window.ESC_BUTTON = 27;
  window.ENTER_BUTTON = 13;

  window.getRandom = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

})();
