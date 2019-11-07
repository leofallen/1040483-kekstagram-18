'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  window.data = {

    ESC_BUTTON: 27,
    ENTER_BUTTON: 13,
    LOAD_SUCCESS: 200,
    LOAD_TIMEOUT: 10000,

    picturesList: document.querySelector('.pictures'),

    debounce: function (cb) {
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
    },

    shuffle: function (arr) {
      var j = '';
      var temp = '';
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },

    getXHR: function () {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      return xhr;
    },

    getLoading: function (xhr, onSuccess, onError, method, URL, data) {

      xhr.addEventListener('load', function () {
        if (xhr.status === window.data.LOAD_SUCCESS) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.data.LOAD_TIMEOUT;

      xhr.open(method, URL);
      xhr.send(data);
    }

  };

})();
