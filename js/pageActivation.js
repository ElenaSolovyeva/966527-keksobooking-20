'use strict';

window.pageActivation = (function () {
  var Y_MIN = 130;
  var Y_MAX = 630;

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormAddress = adForm.querySelector('#address');

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersForm.querySelectorAll('select');
  var mapFilterInputs = mapFiltersForm.querySelectorAll('input');

  var mapPosition; // = window.map.map.getBoundingClientRect();
  var pointerPosition = {
    left: null,
    top: null
  };

  var moveTo = function (evt, element) {
    if ((evt.clientX - pointerPosition.left) < mapPosition.left) {
      element.style.left = -element.clientWidth / 2 + 'px';
    } else if ((evt.clientX + pointerPosition.left) > (mapPosition.left + mapPosition.width)) {
      element.style.left = (mapPosition.width - element.clientWidth / 2) + 'px';
    } else {
      element.style.left = evt.clientX - mapPosition.left - pointerPosition.left + 'px';
    }

    if ((evt.clientY - pointerPosition.top) < (Y_MIN - element.clientHeight)) {
      element.style.top = (Y_MIN - element.clientHeight) + 'px';
    } else if ((evt.clientY - pointerPosition.top) > Y_MAX - element.clientHeight) {
      element.style.top = (Y_MAX - element.clientHeight) + 'px';
    } else {
      element.style.top = ((evt.clientY - mapPosition.top) - pointerPosition.top) + 'px';
    }

    window.pin.setAddress();
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    moveTo(moveEvt, window.pin.mainPin);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('onMouseUp', onMouseUp);
  };


  var onMainPinClick = function (evt) {
    console.log('0) СРАБАТЫВАЕТ ОБРАБОТЧИК onMainPinClick');
    evt.preventDefault();
    // Загрузка объявлений других пользователей
    var onLoad = function (data) {
      console.log('5) ВЫПОЛНЯЕТСЯ ФУНКЦИЯ onLoad = function (data) {}');
      window.map.adList = data;
      console.log('5A) СОСТОЯНИЕ window.map.adList ПОСЛЕ ВЫЗОВА onLoad(xhr.response)');
      console.log(window.map.adList);
      console.log('6) ВЫЗОВ ФУНКЦИИ window.map.renderPins(data); ДО ЭТОГО МЕСТА ВСЁ ОК');
      window.map.renderPins(data);
    };

    var onError = function (message) {
      var errorBlock = document.createElement('p');
      errorBlock.innerHTML = '<p style="color: red">' + message + '</p>';
      errorBlock.style.width = '100%';
      document.querySelector('.map__title').insertAdjacentHTML('beforeend', errorBlock.innerHTML);
    };

    if (document.querySelectorAll('.map__pin--users-pin').length === 0) {
      console.log('1) ОРАБОТЧИК ВЫЗЫВАЕТ ФУНКЦИЮ window.adData.load(onLoad, onError);');
      window.adData.load(onLoad, onError);
    }

    // Активация страницы
    if (evt.button === 0 || evt.key === 'Enter') {
      if (window.map.map.classList.contains('map--faded')) { // если по пину кликают на уже активированной странице, класса 'map--faded' нет
        window.map.map.classList.remove('map--faded');
        if (window.form.adForm.classList.contains('ad-form--disabled')) {
          window.form.adForm.classList.remove('ad-form--disabled');
        }
        for (var i = 0; i < adFormInputs.length; i += 1) {
          adFormInputs[i].removeAttribute('disabled');
        }
        for (var j = 0; j < adFormSelects.length; j += 1) {
          adFormSelects[j].removeAttribute('disabled');
        }
        if (mapFiltersForm.classList.contains('.map__filters--disabled')) {
          mapFiltersForm.classList.remove('map__filters--disabled');
        }
        for (var k = 0; k < mapFilterInputs.length; k += 1) {
          mapFilterInputs[k].removeAttribute('disabled');
        }
        for (var l = 0; l < mapFilterSelects.length; l += 1) {
          mapFilterSelects[l].removeAttribute('disabled');
        }

        adFormAddress.setAttribute('readonly', true);
        window.form.adFormPrice.placeholder = 1000; // при активации формы по умолчанию указывается цена за квартиру
        window.form.adFormPrice.value = 1000;
        window.pin.setAddress();
      }
    }
    // Обработка перетаскивания главной метки
    mapPosition = window.map.map.getBoundingClientRect();
    var draggableCoords = window.pin.mainPin.getBoundingClientRect();

    pointerPosition.left = evt.clientX - draggableCoords.left;
    pointerPosition.top = evt.clientY - draggableCoords.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pin.mainPin.addEventListener('mousedown', onMainPinClick);
  window.pin.mainPin.addEventListener('keydown', onMainPinClick);

  return {mapFiltersForm: mapFiltersForm};
})();
