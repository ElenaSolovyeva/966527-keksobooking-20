'use strict';

window.pageActivation = (function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var PINS_COUNT = 5;
  var DEBOUNCE_INTERVAL = 500;

  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormAddress = adForm.querySelector('#address');

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersForm.querySelectorAll('select');
  var mapFilterInputs = mapFiltersForm.querySelectorAll('input');

  var filterFields = [
    mapFiltersForm.querySelector('#housing-type'),
    mapFiltersForm.querySelector('#housing-price'),
    mapFiltersForm.querySelector('#housing-rooms'),
    mapFiltersForm.querySelector('#housing-guests')
  ];

  var mapPosition;
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
    evt.preventDefault();
    if (evt.button === 0 || evt.key === 'Enter') {
      // Загрузка объявлений других пользователей
      var onLoad = function (data) {
        if (data.length > PINS_COUNT) {
          window.adData.adList = data.slice(0, PINS_COUNT);
        } else {
          window.adData.adList = data.slice();
        }

        window.map.renderPins(window.adData.adList);
      };

      var onError = function (message) {
        var errorBlock = document.createElement('p');
        errorBlock.innerHTML = '<p style="color: red">' + message + '</p>';
        errorBlock.style.width = '100%';
        document.querySelector('.map__title').insertAdjacentHTML('beforeend', errorBlock.innerHTML);
      };

      if (document.querySelectorAll('.map__pin--users-pin').length === 0) {
        window.adData.load(onLoad, onError);
      }
      // Активация страницы
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

  // ФИЛЬТРАЦИЯ ОТРИСОВАННЫХ ПИНОВ
  var lastTimeout;
  var onFilterChange = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      var openedCard = document.querySelector('.map__card');
      if (openedCard) {
        openedCard.remove();
      }
      if (window.map.usersPinList.length > 0) {
        window.map.removePins();
      }
      window.map.filteredAdList.splice();
      window.map.filteredAdList = window.adData.adList.filter(function (current) {
        return window.filter.compareWithCurrentFilter(current);
      }).slice();
      if (window.map.filteredAdList.length > 0) {
        window.map.renderPins(window.map.filteredAdList);
      }
    },
    DEBOUNCE_INTERVAL);
  };

  filterFields.forEach(function (current) {
    current.addEventListener('input', onFilterChange);
  });

  window.filter.featuresSelects.forEach(function (current) {
    current.addEventListener('input', onFilterChange);
  });

  return {mapFiltersForm: mapFiltersForm};
})();
