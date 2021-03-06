'use strict';

window.pin = (function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = mainPin.clientWidth;
  var MAIN_PIN_HEIGHT = mainPin.clientHeight;
  var mainPinAddressInput = window.form.adForm.querySelector('#address');

  var mapPin = document.querySelector('.map__pin');
  var labelTemplate = document.querySelector('#pin').content;
  var offsetX = (mapPin.getBoundingClientRect().width) / 2;
  var offsetY = mapPin.getBoundingClientRect().height;


  var createAdPin = function (ad) {
    var newAdPin = labelTemplate.cloneNode(true).querySelector('button');
    var x = ad.location.x - offsetX;
    var y = ad.location.y - offsetY;
    newAdPin.style.left = x + 'px';
    newAdPin.style.top = y + 'px';
    var newAdImg = newAdPin.querySelector('img');
    newAdImg.src = ad.author.avatar;
    newAdImg.alt = ad.offer.title;
    newAdPin.classList.add('map__pin--users-pin');
    return newAdPin;
  };

  var setAddress = function () {
    var mainPinLeft = mapPin.style.left;
    var mainPinLeftAsArray = mainPinLeft.split('px');
    var mainPinLeftInteger = parseInt(mainPinLeftAsArray[0], 10);

    var mainPinTop = mapPin.style.top;
    var mainTopAsArray = mainPinTop.split('px');
    var mainPinTopInteger = parseInt(mainTopAsArray[0], 10);

    if (window.form.adForm.classList.contains('ad-form--disabled')) {
      var addressXinactive = mainPinLeftInteger + Math.round(MAIN_PIN_WIDTH / 2);
      var addressYinactive = mainPinTopInteger + Math.round(MAIN_PIN_HEIGHT / 2);
      mainPinAddressInput.value = addressXinactive + ', ' + addressYinactive;
    } else {
      var addressX = mainPinLeftInteger + Math.round(MAIN_PIN_WIDTH / 2);
      var addressY = mainPinTopInteger + MAIN_PIN_HEIGHT;
      mainPinAddressInput.value = addressX + ', ' + addressY;
    }
  };

  var setMainPinCentral = function () {
    var mapWidth = map.getBoundingClientRect().width;
    var mapHeight = map.getBoundingClientRect().height;
    var mainPinLeft = Math.round(mapWidth / 2 - MAIN_PIN_WIDTH / 2, 0);
    var mainPinTop = Math.round(mapHeight / 2 - MAIN_PIN_HEIGHT / 2, 0);
    var mainPinPosition = 'left: ' + mainPinLeft + 'px;' + 'top: ' + mainPinTop + 'px';
    mainPin.setAttribute('style', mainPinPosition);
  };

  return {
    mainPin: mainPin,
    createAdPin: createAdPin,
    setAddress: setAddress,
    setMainPinCentral: setMainPinCentral
  };
})();
