'use strict';


var map = document.querySelector('.map');

var mapPin = document.querySelector('.map__pin');

var mainPin = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mainPin.clientWidth;
var MAIN_PIN_HEIGHT = mainPin.clientHeight;


var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var mainPinAddressInput = adForm.querySelector('#address');
var roomsNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
// var adFormTitle = adForm.querySelector('#title');
// var adFormPrice = adForm.querySelector('#price');
// var adFormType = adForm.querySelector('#type');
// var timeIn = adForm.querySelector('#timein');
// var timeOut = adForm.querySelector('#timeout');
var adFormAddress = adForm.querySelector('#address');

var mapFiltersForm = document.querySelector('.map__filters');
var mapFilterSelects = mapFiltersForm.querySelectorAll('select');
var mapFilterInputs = mapFiltersForm.querySelectorAll('input');


// ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ:  util.js
//    return {
//      getRandomInteger: getRandomInteger,
//     shuffle: shuffle,
//     getRandomElements: getRandomElements
//    };

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ И СПИСКА ОБЪЯВЛЕНИЙ: adData.js
//    return adList;

// СОЗДАНИЕ И ОТРИСОВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ:  card.js
//    return {createAdCard: createAdCard};

// СОЗДАНИЕ И ОТРИСОВКА МЕТКИ ОБЪЯВЛЕНЯ: pin.js
//       return {
//         createAdPin: createAdPin,
//         renderPins: renderPins
//       };

// ОТРИСОВКА КАРТОЧЕК И МЕТОК: map.js
//     return {
//       renderCard: renderCard,
//       renderPins: renderPins
//     };

// ********* ДЕАКТИВАЦИЯ И АКТИВАЦИЯ СТРАНИЦЫ *********

var setAddress = function () {
  var mainPinLeft = mapPin.style.left;
  var mainPinLeftAsArray = mainPinLeft.split('px');
  var mainPinLeftInteger = parseInt(mainPinLeftAsArray[0], 10);
  var mainPinTop = mapPin.style.top;
  var mainTopAsArray = mainPinTop.split('px');
  var mainPinTopInteger = parseInt(mainTopAsArray[0], 10);
  if (adForm.classList.contains('ad-form--disabled')) {
    var addressXinactive = mainPinLeftInteger + Math.round(MAIN_PIN_WIDTH / 2);
    var addressYinactive = mainPinTopInteger + Math.round(MAIN_PIN_HEIGHT / 2);
    mainPinAddressInput.value = addressXinactive + ', ' + addressYinactive;
  } else {
    var addressX = mainPinLeftInteger + Math.round(MAIN_PIN_WIDTH / 2);
    var addressY = mainPinTopInteger + MAIN_PIN_HEIGHT;
    mainPinAddressInput.value = addressX + ', ' + addressY;
  }
};

var disableForm = function (form, className) {
  var selects = form.querySelectorAll('select');
  var inputs = form.querySelectorAll('input');
  if (!(form.classList.contains(className + '--disabled'))) {
    form.classList.add(className + '--disabled');
  }
  if (selects) {
    for (var i = 0; i < selects.length; i += 1) {
      selects[i].disabled = true;
    }
  }
  if (inputs) {
    for (var j = 0; j < inputs.length; j += 1) {
      inputs[i].disabled = true;
    }
  }
};

var makePageInactive = function () {
  if (!(map.classList.contains('.map--faded'))) {
    map.classList.add('map--faded');
  }
  disableForm(adForm, 'ad-form');
  disableForm(mapFiltersForm, 'map__filters');
  var invalidFieldsCount = invalidFields.length;
  invalidFields.splice(0, invalidFieldsCount); // обнуляет массив невалидных полей
  setAddress();
  // удаляет обработчики при деактивации страницы
  mainPin.removeEventListener('mousedown', onMainPinClick);
  mainPin.removeEventListener('keydown', onMainPinClick);
  if (usersPinList.length > 0) {
    adPin.removeEventListener('mousedown', onAdPinClick);
    adPin.removeEventListener('keydown', onAdPinClick);
  }
  if (closeButton) { // card.js
    closeButton.removeEventListener('mousedown', onCloseButtonClick);
    closeButton.removeEventListener('keydown', onCloseButtonClick);
  }
  adFormTitle.removeEventListener('blur', validateTitle);
  adFormPrice.removeEventListener('blur', validatePrice);
  adFormType.removeEventListener('change', setPricePlaseholder);
  timeIn.removeEventListener('blur', synchronizeTime);
  timeOut.removeEventListener('blur', synchronizeTime);
  roomsNumberSelect.removeEventListener('change', validateRoomsAndCapacity);
  capacitySelect.removeEventListener('change', validateRoomsAndCapacity);
};

makePageInactive();

var makeActive = function () {
  if (document.querySelectorAll('.map__pin').length <= 1) {
    renderPins();
  }
};

// ********* ОБРАБОТЧИК ДЛЯ main--pin *********

var onMainPinClick = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    if (map.classList.contains('map--faded')) { // если по пину кликают на уже активированной странице, класса 'map--faded' нет
      map.classList.remove('map--faded');
      if (adForm.classList.contains('ad-form--disabled')) {
        adForm.classList.remove('ad-form--disabled');
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
      adFormPrice.placeholder = 1000; // при активации формы по умолчанию указывается цена за квартиру
      setAddress();
      makeActive();
    }
  }
};

mainPin.addEventListener('mousedown', onMainPinClick);
mainPin.addEventListener('keydown', onMainPinClick);

// Обработчик пользовательских pin' ов (отрисовка карточки)


// ********* ВАЛИДАЦИЯ ФОРМЫ *********
