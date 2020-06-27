'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SEND_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {};

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend.load = function (onLoad, onError) {
    var xhr = getData(onLoad, onError);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend.save = function (data, onLoad, onError) {
    var xhr = getData(onLoad, onError);
    xhr.open('POST', SEND_URL);
    xhr.send(data);
  };
})();
