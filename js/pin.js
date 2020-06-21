'use strict';

window.pin = (function () {
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
    return newAdPin;
  };


  return {
    createAdPin: createAdPin,
  };
})();
