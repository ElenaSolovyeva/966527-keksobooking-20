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
var PHOTOS_MAX_NUMBER = 5; // Максимально разрешенное кол-во фото в одном объявлении
var X_MIN = 0;
var Y_MIN = 130;
var Y_MAX = 630;
var X_MIN = 0;
var BLOCK_WIDTH = 1200;
var X_MAX = X_MIN + BLOCK_WIDTH;

var map = document.querySelector('.map');
var labelTemplate = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var offsetX = (mapPin.getBoundingClientRect().width) / 2;
var offsetY = mapPin.getBoundingClientRect().height;

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

var createRandomPhotoLinks = function (type) {
  var numberOfPhotos = getRandomInteger(1, PHOTOS_MAX_NUMBER);
  var photoLinks = [];

  for (var i = 0; i < numberOfPhotos; i += 1) {
    photoLinks[i] = 'http://o0.github.io/assets/images/tokyo/' + type + String(i) + '.jpg';
  }
  return photoLinks;
};

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
      type: offerType,
      rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
      checkin: CHECKINS[getRandomInteger(0, CHECKINS.length)],
      checkout: CHECKOUTS[getRandomInteger(0, CHECKOUTS.length)],
      features: getRandomElements(FEATURES_LIST),
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length)],
      photos: createRandomPhotoLinks(offerType)
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
