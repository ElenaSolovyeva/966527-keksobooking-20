'use strict';

window.adData = (function () {
  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data'
  };

  var STATUS_CODE = {
    ok: 200
  };
  var TIMEOUT = 1000;
  var METHOD = {
    get: 'GET',
    post: 'POST'
  };

  var adList = [];


  var createXhr = function (onLoad, onError, method, url) { // , data?
    console.log('3) ВЫПОЛНЯЕТСЯ ФУНКЦИЯ createXhr = function (onLoad, onError, method, url) {...}');
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.ok) {
        console.log('3A) СОСТОЯНИЕ window.map.adList ПЕРЕД ВЫЗОВОМ onLoad(xhr.response)' + window.map.adList);
        console.log('4) ВЫЗОВ ФУНКЦИИ onLoad(xhr.response);');
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

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    xhr.send(); // xhr.send(data); ?
  };

  var load = function (onLoad, onError) {
    console.log('2) ВЫПОЛНЯЕТСЯ ФУНКЦИЯ load = function (onLoad, onError) {createXhr(onLoad, onError, METHOD.get, URL.load);}');
    createXhr(onLoad, onError, METHOD.get, URL.load);
  };


  return {
    load: load,
    adList: adList
  };
})();
