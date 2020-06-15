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

var map = document.querySelector('.map');
var labelTemplate = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var offsetX = (mapPin.getBoundingClientRect().width) / 2;
var offsetY = mapPin.getBoundingClientRect().height;

var cardTemplate = document.querySelector('#card');

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

// var createRandomPhotoLinks = function (type) {
//   var numberOfPhotos = getRandomInteger(1, PHOTOS_MAX_NUMBER);
//   var photoLinks = [];
//
//   for (var i = 0; i < numberOfPhotos; i += 1) {
//     photoLinks[i] = 'http://o0.github.io/assets/images/tokyo/' + type + String(i) + '.jpg';
//   }
//   return photoLinks;
// };

// ********* СОЗДАНИЕ ОБЪЯВЛЕНЯ И СПИСКА ОБЪЯВЛЕНИЙ *********

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
  var adList = [];

  for (var i = 0; i < AD_QUANTITY; i += 1) {
    adList[i] = getAdData(i);
  }
  return adList;
};

map.classList.remove('map--faded');

// ********* СОЗДАНИЕ И ОТРИСОВКА МЕТКИ ОБЪЯВЛЕНЯ *********

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

var renderAdLabels = function () {
  var fragment = document.createDocumentFragment();
  var adList = getAdsData();

  for (var i = 0; i < adList.length; i += 1) {
    var adPin = createAdPin(adList[i]);
    fragment.appendChild(adPin);
  }

  mapPins.appendChild(fragment);
};

renderAdLabels();

// ********* СОЗДАНИЕ И ОТРИСОВКА КАРТОЧКИ ОБЪЯВЛЕНЯ *********
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

// renderPhotos(ad.offer.photos, popupPhoto, popupPhotos);
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
  var popupÀddress = newAdCard.querySelector('.popup__text--address');
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
    popupÀddress.textContent = ad.offer.address;
  } else {
    popupÀddress.remove();
  }

  if (!ad.offer.prise.value) {
    var adPrice = ad.offer.prise;
    popupPrice.textContent = adPrice;
    popupPrice.insertAdjacentHTML('beforeend', ' &#x20bd;<span>/ночь</span>');
  } else {
    popupPrice.remove();
  }

  if (!ad.offer.type.value) {
    popupType.textContent = TYPES[ad.offer.type];
  } else {
    popupType.remove();
  }

  if (!ad.offer.rooms.value) {
    var roomsText = ad.offer.rooms + ' ' + formatRoomsText(ad.offer.rooms);
    popupCapacity.textContent = roomsText;

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

  if (!ad.offer.description) {
    popupDescription.textContent = ad.offer.description;
  } else {
    popupDescription.remove();
  }

  renderPhotos(ad.offer.photos, popupPhoto, popupPhotos);

  avatarImg.src = ad.author.avatar;

  return newAdCard;
};

var renderCard = function () {
  var firstCardFragment = createAdCard(getAdData(0));
  var firstCard = firstCardFragment.querySelector('.map__card');
  var elementBefore = map.querySelector('.map__filters-container');

  elementBefore.insertAdjacentElement('beforeBegin', firstCard);
};

renderCard();
