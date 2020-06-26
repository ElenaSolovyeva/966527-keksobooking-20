'use strict';

window.adData = (function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT;
  var adList = [];

  var onLoad = function (data) {
    for (var i = 0; i < data.length; i += 1) {
      adList.push(data[i]);
    }
    return adList;
  };

  var onError = function (message) {
    var errorBlock = document.createElement('p');
    errorBlock.innerHTML = '<p style="color: red">' + message + '</p>';
    errorBlock.style.width = '100%';
    document.querySelector('.map__title').insertAdjacentHTML('beforeend', errorBlock.innerHTML);
  };

  xhr.addEventListener('load', function () {
    if (xhr.status === STATUS_OK) {
      onLoad(xhr.response);
    } else {
      onError('Объявления других пользователей не найдены.   ' + 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.open('GET', URL);

  xhr.send();


  return {adList: adList};
})();
