'use strict';

window.form = (function () {

  var LOWER_BOUND = 0;
  var UPPER_BOUND = 100;

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var adForm = document.querySelector('.ad-form');
  var adFormTypeSelect = adForm.querySelector('#type');

  // to export:
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');


  var invalidFields = [];


  // Валидация заголовка сообщения
  var getTitleValidationMessage = function () {
    var message;
    var titleLength = parseInt(adFormTitle.value.length, 10);
    if (titleLength < 30) {
      message = 'В заголовке должно быть более 30-ти символов';
      invalidFields.push(adFormTitle);
    } else if (titleLength > 100) {
      message = 'В заголовке должно быть менее 100 символов';
      invalidFields.push(adFormTitle);
    } else {
      message = '';
    }
    return message;
  };

  var validateTitle = function () {
    var message = getTitleValidationMessage();
    adFormTitle.setCustomValidity(message);
    adFormTitle.reportValidity();
  };
  adFormTitle.addEventListener('blur', validateTitle);

  // Валидация цены и типа жилья
  var getMinPrice = function (type) {
    var minPrice;
    switch (type) {
      case 'bungalo':
        minPrice = MIN_PRICE_BUNGALO;
        break;
      case 'flat':
        minPrice = MIN_PRICE_FLAT;
        break;
      case 'house':
        minPrice = MIN_PRICE_HOUSE;
        break;
      case 'palace':
        minPrice = MIN_PRICE_PALACE;
        break;
      default:
      // потом сделаю throw exception ('Для данного типа жилья минимальная цена не установлена');
    }
    return minPrice;
  };

  var getPriceValidationMessage = function () {
    var message;
    var adFormTypeOption = adFormTypeSelect.value;
    var minPriceForThisType = getMinPrice(adFormTypeOption);
    if (adFormPrice.value === '') {
      message = 'Не указана минимальная цена';
      invalidFields.push(adFormPrice);
    } else if (parseInt(adFormPrice.value, 10) < minPriceForThisType) {
      message = 'Минимальная цена за данный тип жилья составляет ' + minPriceForThisType + ' руб./ночь';
      invalidFields.push(adFormPrice);
    } else if (parseInt(adFormPrice.value, 10) > parseInt(adFormPrice.max, 10)) {
      message = 'Максимальная цена составляет ' + adFormPrice.max + ' руб./ночь';
      invalidFields.push(adFormPrice);
    } else {
      message = '';
    }
    return message;
  };

  var validatePrice = function () {
    var message = getPriceValidationMessage();
    adFormPrice.setCustomValidity(message);
    adFormPrice.reportValidity();
  };

  adFormPrice.addEventListener('blur', validatePrice);

  // Вместе с минимальным значением цены нужно изменять и плейсхолдер.
  var setPricePlaseholder = function () {
    adFormPrice.placeholder = getMinPrice(adFormType.value);
  };

  adFormType.addEventListener('change', setPricePlaseholder);

  // Валидация адреса - атрибут readonly установлен в коллбэке onMainPinClick

  // Синхронизация checkin - checkout
  var synchronizeTime = function (evt) {
    if (evt.target.id === 'timein') {
      timeOut.value = timeIn.value;
    } else {
      timeIn.value = timeOut.value;
    }
  };

  timeIn.addEventListener('blur', synchronizeTime);
  timeOut.addEventListener('blur', synchronizeTime);

  // Валидация соответствия количества комнат и гостей - form.js
  var getRoomsValidationMessage = function () {
    var rooms = parseInt(roomsNumberSelect.value, 10);
    var guests = parseInt(capacitySelect.value, 10);
    var message;
    if (rooms === UPPER_BOUND && guests !== LOWER_BOUND) {
      message = 'не для гостей';
      invalidFields.push(capacitySelect);
    } else if (guests === LOWER_BOUND && rooms !== UPPER_BOUND) {
      message = 'не для гостей только 100 комнат';
      invalidFields.push(roomsNumberSelect);
    } else if (rooms < guests) {
      message = 'Количество гостей не может быть больше количества комнат';
      invalidFields.push(roomsNumberSelect);
    } else {
      message = '';
    }
    return message;
  };

  var validateRoomsAndCapacity = function () {
    var message = getRoomsValidationMessage();
    roomsNumberSelect.setCustomValidity(message);
    capacitySelect.setCustomValidity(message);
    roomsNumberSelect.reportValidity();
    capacitySelect.reportValidity();
  };

  roomsNumberSelect.addEventListener('change', validateRoomsAndCapacity);
  capacitySelect.addEventListener('change', validateRoomsAndCapacity);


})();
