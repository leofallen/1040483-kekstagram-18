'use strict';

(function () {

  window.picturesList = document.querySelector('.pictures');

  window.ESC_BUTTON = 27;
  window.ENTER_BUTTON = 13;

  window.getRandom = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.shuffle = function (arr) {
    var j = '';
    var temp = '';
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  // window.debounce = function (f, ms) {

  //   var isCooldown = false;

  //   return function() {
  //     if (isCooldown) return;

  //     f.apply(this, arguments);

  //     isCooldown = true;

  //     setTimeout(() => isCooldown = false, ms);
  //   };

  // }

})();
