'use strict';

var AD_QUANTITY = 8;
var IMG_LINK_ADRESS = 'img/avatars/user';
var IMG_FORMAT = '.png';

var TITLES = ['Квартира с видом на парк', 'Уютная комната', 'Шикарные апартаменты', 'Дом с участком', 'Холостяцкая берлога', 'Однушка для студента', '2х-комнатная квартира', 'Сдам на долгий срок'];
var PRISES = [1000, 300, 1500, 2500, 750, 500, 900, 1200]; //  берите случайное число из массива
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 7;
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Descrtiption 1', 'Descrtiption 2', 'Descrtiption 3', 'Descrtiption 4', 'Descrtiption 5', 'Descrtiption 6', 'Descrtiption 7', 'Descrtiption 8'];
// var PHOTOS_MAX_NUMBER = 5; // Максимально разрешенное кол-во фото в одном объявлении
var PHOTOS_LINKS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var X_MIN = 0;
var Y_MIN = 130;
var Y_MAX = 630;
var BLOCK_WIDTH = 1200;
var X_MAX = X_MIN + BLOCK_WIDTH;

var adList = Array.from(Array(AD_QUANTITY));

var map = document.querySelector('.map');
var labelTemplate = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mainPin.clientWidth;
var MAIN_PIN_HEIGHT = mainPin.clientHeight;

var offsetX = (mapPin.getBoundingClientRect().width) / 2;
var offsetY = mapPin.getBoundingClientRect().height;

var cardTemplate = document.querySelector('#card'); // для отрисовки карточки объявления

var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var mainPinAddressInput = adForm.querySelector('#address');
var roomsNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
var adFormTitle = adForm.querySelector('#title');
var adFormTypeSelect = adForm.querySelector('#type');
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var adFormAddress = adForm.querySelector('#address');

var mapFiltersForm = document.querySelector('.map__filters');
var mapFilterSelects = mapFiltersForm.querySelectorAll('select');
var mapFilterInputs = mapFiltersForm.querySelectorAll('input');
var invalidFields = [];
var usersPinList = [];

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

var shuffle = function (array) {
  for (var i = (array.length - 1); i > 0; i -= 1) {
    for (var j = 0; j < i; j += 1) {
      var randomIndex = getRandomInteger(0, j);
      var temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }
  return array;
};

var getRandomElements = function (array) {
  var mixedArray = shuffle(array);
  var numberOfElements = getRandomInteger(0, array.length - 1);
  var selectedElements = mixedArray.slice(numberOfElements);
  return selectedElements;
};

// var getSelectedValue = function (select) {
//   var options = select.querySelectorAll('option');
//   var selectedValue;
//
//   for (var i = 0; i < options.length; i += 1) {
//     if (options[i].selected) {
//       selectedValue = parseInt(options[i].value, 10);
//     }
//   }
//
//   return selectedValue;
// };

// ********* СОЗДАНИЕ ОБЪЯВЛЕНИЯ И СПИСКА ОБЪЯВЛЕНИЙ *********

var getAdData = function (index) {
  var locationX = getRandomInteger(X_MIN, X_MAX);
  var locationY = getRandomInteger(Y_MIN, Y_MAX);
  var offerType = TYPES[getRandomInteger(0, (TYPES.length - 1))];

  var ad = {
    author: {
      avatar: IMG_LINK_ADRESS + '0' + String(index + 1) + IMG_FORMAT
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: TITLES[index],
      address: '(' + locationX + ', ' + locationY + ')',
      prise: PRISES[getRandomInteger(0, (PRISES.length - 1))],
      type: offerType, // индекс типа объявления в массиве var TYPES = ['palace', 'flat', 'house', 'bungalo'];
      rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: CHECKINS[getRandomInteger(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomInteger(0, CHECKOUTS.length - 1)],
      features: getRandomElements(FEATURES_LIST),
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      photos: getRandomElements(PHOTOS_LINKS) // createRandomPhotoLinks(offerType)
    }
  };
  return ad;
};

var getAdsData = function () {
  for (var i = 0; i < AD_QUANTITY; i += 1) {
    adList[i] = getAdData(i);
  }
};

getAdsData(); // заполняет adList (список объявлений)

// ********* СОЗДАНИЕ И ОТРИСОВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ *********

var formatRoomsText = function (roomsNumber) {
  var stringRooms;
  if (roomsNumber === 1) {
    stringRooms = 'комната';
  } else if (roomsNumber < 5) {
    stringRooms = 'комнаты';
  } else {
    stringRooms = 'комнат';
  }
  return stringRooms;
};

var formatGuestsText = function (guestsNumber) {
  var stringGuests;
  if (guestsNumber === 1) {
    stringGuests = 'гостя';
  } else {
    stringGuests = 'гостей';
  }
  return stringGuests;
};

var renderFeaturesList = function (adFeatures, domList) {
  var adFeaturesCount = adFeatures.length;
  var templateFeatures = domList.querySelectorAll('.popup__feature');
  var templateFeaturesCount = templateFeatures.length;
  if (adFeaturesCount > 0) {
    for (var i = 0; i < templateFeaturesCount; i += 1) {
      for (var j = 0; j < adFeaturesCount; j += 1) {
        var className = 'popup__feature--' + adFeatures[j];

        if (templateFeatures[i].classList.contains(className)) {
          templateFeatures[i].textContent = 'adFeatures[j]';
        }
      }
    }
    for (var k = 0; k < templateFeaturesCount; k += 1) {
      if (templateFeatures[k].textContent === '') {
        templateFeatures[k].remove();
      }
    }
  } else {
    domList.remove();
  }
};

var renderPhotos = function (adPhotos, img, divPhotos) {
  if (!adPhotos.value) {
    var photosCount = adPhotos.length;
    if (photosCount === 1) {
      img.setAttribute('src', adPhotos);
    } else if (photosCount > 1) {
      img.setAttribute('src', adPhotos[0]);
      for (var i = 1; i < photosCount; i += 1) {
        var nextPhoto = img.cloneNode(true);
        nextPhoto.setAttribute('src', adPhotos[i]);
        divPhotos.appendChild(nextPhoto);
      }
    }
  }
};

var createAdCard = function (ad) {
  var newAdCard = cardTemplate.cloneNode(true).content;
  var popupTitle = newAdCard.querySelector('.popup__title');
  var popupAddress = newAdCard.querySelector('.popup__text--address');
  var popupPrice = newAdCard.querySelector('.popup__text--price');
  var popupType = newAdCard.querySelector('.popup__type');
  var popupCapacity = newAdCard.querySelector('.popup__text--capacity');
  var popupTime = newAdCard.querySelector('.popup__text--time');
  var popupFeaturesList = newAdCard.querySelector('.popup__features');
  var popupDescription = newAdCard.querySelector('.popup__description');
  var popupPhotos = newAdCard.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var avatarImg = newAdCard.querySelector('.popup__avatar');

  // Значения, которые интуитивно «пустые», вроде 0, пустой строки, null, undefined и NaN, становятся false.
  if (!ad.offer.title.value) {
    popupTitle.textContent = ad.offer.title;
  } else {
    popupTitle.remove();
  }

  if (!ad.offer.address.value) {
    popupAddress.textContent = ad.offer.address;
  } else {
    popupAddress.remove();
  }

  if (!ad.offer.prise.value) {
    popupPrice.textContent = ad.offer.prise;
    popupPrice.insertAdjacentHTML('beforeend', ' &#x20bd;<span>/ночь</span>');
  } else {
    popupPrice.remove();
  }

  if (!ad.offer.type.value) {
    popupType.textContent = ad.offer.type;
  } else {
    popupType.remove();
  }

  if (!ad.offer.rooms.value) {
    popupCapacity.textContent = ad.offer.rooms + ' ' + formatRoomsText(ad.offer.rooms);

    if (!ad.offer.guests.value) {
      var guestsText = ' для ' + ad.offer.guests + ' ' + formatGuestsText(ad.offer.guests);
      popupCapacity.insertAdjacentHTML('beforeEnd', guestsText);
    }
  } else {
    popupCapacity.remove();
  }

  if (!ad.offer.checkin.value) {
    var checkinText = 'Заезд до ' + ad.offer.checkin;
  }

  if (!ad.offer.checkout.value) {
    var checkoutText = 'Выезд до ' + ad.offer.checkout;
  }

  if (!ad.offer.checkin.value && !ad.offer.checkout.value) {
    popupTime.textContent = checkinText + ', ' + checkoutText;
  } else if (!ad.offer.checkin.value && ad.offer.checkout.value) {
    popupTime.textContent = checkinText;
  } else if (ad.offer.checkin.value && !ad.offer.checkout.value) {
    popupTime.textContent = checkoutText;
  } else {
    popupTime.remove();
  }

  popupFeaturesList.textcontent = '';
  renderFeaturesList(ad.offer.features, popupFeaturesList);
  if (!ad.offer.description.value) {
    popupDescription.textContent = ad.offer.description;
  } else {
    popupDescription.remove();
  }
  renderPhotos(ad.offer.photos, popupPhoto, popupPhotos);
  avatarImg.src = ad.author.avatar;
  return newAdCard;
};

var renderCard = function (ad) {
  var firstCardFragment = createAdCard(ad);
  var firstCard = firstCardFragment.querySelector('.map__card');
  var elementBefore = map.querySelector('.map__filters-container');
  elementBefore.insertAdjacentElement('beforeBegin', firstCard);

  // Обработчик карточки объявления
  var onCloseButtonClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.querySelector('.map__card').remove();
    }
  };
  var closeButton = map.querySelector('.popup__close');
  closeButton.addEventListener('mousedown', onCloseButtonClick);
  closeButton.addEventListener('keydown', onCloseButtonClick);
};

// ********* СОЗДАНИЕ И ОТРИСОВКА МЕТКИ ОБЪЯВЛЕНЯ *********

// ********* Обработчики для меток объявлений *********
var onAdPinClick = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    var pinIndex = usersPinList.indexOf(evt.target.parentNode, 0);
    var previousCard = map.querySelector('.map__card');
    if (previousCard) {
      previousCard.remove();
    }
    renderCard(adList[pinIndex]);
  }
};

// ********* Отрисовка метки *********

var createAdPin = function (ad) {
  var newAdPin = labelTemplate.cloneNode(true).querySelector('button');
  var x = ad.location.x - offsetX;
  var y = ad.location.y - offsetY;
  newAdPin.style.left = x + 'px';
  newAdPin.style.top = y + 'px';
  var newAdImg = newAdPin.querySelector('img');
  newAdImg.src = ad.author.avatar;
  newAdImg.alt = ad.offer.title;
  return newAdPin;
};


var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adList.length; i += 1) {
    var adPin = createAdPin(adList[i]);
    usersPinList.push(adPin);
    fragment.appendChild(adPin);
    adPin.addEventListener('mousedown', onAdPinClick);
    adPin.addEventListener('keydown', onAdPinClick);
  }
  mapPins.appendChild(fragment);
};

// renderPins();


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
};

makePageInactive();

var makeActive = function () {
  if (document.querySelectorAll('.map__pin').length <= 1) {
    renderPins();
  }
  // !!! навесить обработчики на пины
};

// ********* ОБРАБОТЧИК ДЛЯ main--pin *********

var onMainPinClick = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
    }
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
    setAddress();
    makeActive();
  }
};

mainPin.addEventListener('mousedown', onMainPinClick);
mainPin.addEventListener('keydown', onMainPinClick);

// Обработчик пользовательских pin' ов (отрисовка карточки)


// ********* ВАЛИДАЦИЯ ФОРМЫ *********

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
      minPrice = 0;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
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

// Валидация соответствия количества комнат и гостей
var getRoomsValidationMessage = function () {
  var rooms = parseInt(roomsNumberSelect.value, 10);
  var guests = parseInt(capacitySelect.value, 10);
  var message;
  if (rooms === 100 && guests !== 0) {
    message = 'не для гостей';
    invalidFields.push(capacitySelect);
  } else if (guests === 0 && rooms !== 100) {
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
