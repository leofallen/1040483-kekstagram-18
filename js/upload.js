'use strict';

(function () {

  window.upLoad = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    if (xhr.readyState === 0) {
      window.form.getloadWindow();
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.LOAD_SUCCESS) {
        onSuccess();
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

    xhr.open('POST', URL);
    xhr.send(data);

  };
})();
