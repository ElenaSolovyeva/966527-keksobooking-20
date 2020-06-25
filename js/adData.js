'use strict';

window.adData = (function () {
  // var AD_QUANTITY = 8;
  // var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;
  // var BLOCK_WIDTH = 1200;
  // var X_MAX = X_MIN + BLOCK_WIDTH;
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = 10000;
  var url = 'https://javascript.pages.academy/keksobooking/data';
  var adList = [];

  var onSuccess = function (data) {
    for (var i = 0; i < data.length; i += 1) {
      adList.push(data[i]);
    }
    return adList;
  };

  var onError = function (message) {
    console.error(message);
  };

  var onXhrLoad = function () {
    var error;
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;
      case 400:
        error = 'Неверный запрос';
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      default:
        error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  };

  xhr.addEventListener('load', onXhrLoad);

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.open('GET', url);
  xhr.send();
  return {
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    adList: adList
  };

})();
