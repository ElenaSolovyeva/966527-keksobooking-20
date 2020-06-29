'use strict';

window.adData = (function () {
  var URL = {
    load: 'https://javascript.pages.academy/keksobooking/data',
    send: 'https://javascript.pages.academy/keksobooking'
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

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE.ok) {
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

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    createXhr();
    xhr.open(METHOD.get, URL.load);
    xhr.send();
  };

  var save = function (onUpload, onError, data) {
    var xhr = createXhr(onUpload, onError);
    xhr.open(METHOD.post, URL.send);
    console.log(data);
    xhr.send();
    createXhr(data);
  };


  return {
    load: load,
    save: save,
    adList: adList
  };
})();
