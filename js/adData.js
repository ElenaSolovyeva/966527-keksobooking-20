'use strict';

window.adData = (function () {
  var AD_QUANTITY = 8;
  var X_MIN = 0;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var BLOCK_WIDTH = 1200;
  var X_MAX = X_MIN + BLOCK_WIDTH;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var IMG_LINK_ADRESS = 'img/avatars/user';
  var IMG_FORMAT = '.png';
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 7;
  var TITLES = ['Квартира с видом на парк', 'Уютная комната', 'Шикарные апартаменты', 'Дом с участком', 'Холостяцкая берлога', 'Однушка для студента', '2х-комнатная квартира', 'Сдам на долгий срок'];
  var PRISES = [1000, 300, 1500, 2500, 750, 500, 900, 1200];
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

  var adList = Array.from(Array(AD_QUANTITY));

  var getAdData = function (index) {
    var locationX = window.util.getRandomInteger(X_MIN, X_MAX);
    var locationY = window.util.getRandomInteger(Y_MIN, Y_MAX);
    var offerType = TYPES[window.util.getRandomInteger(0, (TYPES.length - 1))];

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
        prise: PRISES[window.util.getRandomInteger(0, (PRISES.length - 1))],
        type: offerType, // индекс типа объявления в массиве var TYPES = ['palace', 'flat', 'house', 'bungalo'];
        rooms: window.util.getRandomInteger(ROOMS_MIN, ROOMS_MAX),
        guests: window.util.getRandomInteger(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKINS[window.util.getRandomInteger(0, CHECKINS.length - 1)],
        checkout: CHECKOUTS[window.util.getRandomInteger(0, CHECKOUTS.length - 1)],
        features: window.util.getRandomElements(FEATURES_LIST),
        description: DESCRIPTIONS[window.util.getRandomInteger(0, DESCRIPTIONS.length - 1)],
        photos: window.util.getRandomElements(PHOTOS_LINKS) // createRandomPhotoLinks(offerType)
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

  return {
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    adList: adList
  };

})();
