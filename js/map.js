'use strict';

/* map.js — модуль, который управляет карточками объявлений и метками:
добавляет на страницу нужную карточку, отрисовывает метки
и осуществляет взаимодействие карточки и метки на карте;
*/

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var usersPinList = [];
  var closeButton;


  var onCloseButtonClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.querySelector('.map__card').remove();
    }
  };

  var renderCard = function (ad) {
    var firstCardFragment = window.card.createAdCard(ad);
    var firstCard = firstCardFragment.querySelector('.map__card');
    var elementBefore = map.querySelector('.map__filters-container');
    elementBefore.insertAdjacentElement('beforeBegin', firstCard);
    closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('mousedown', onCloseButtonClick);
    closeButton.addEventListener('keydown', onCloseButtonClick);
  };

  var onAdPinClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      var pinIndex = usersPinList.indexOf(evt.target.parentNode, 0);
      var previousCard = map.querySelector('.map__card');
      if (previousCard) {
        previousCard.remove();
      }
      renderCard(window.adData.adList[pinIndex]);
    }
  };

  var renderPins = function () {
    var adDataList = window.adData.loadAdData();
    console.log('typeof (adDataList) = ' + typeof (adDataList));
    console.log('Array.isArray(adDataList) = ' + Array.isArray(adDataList));
    console.log('adDataList.length = ' + adDataList.length);

    var adDataCount = adDataList.length;


    var fragment = document.createDocumentFragment();
    if (usersPinList.length === 0) {
      console.log('usersPinList = ' + usersPinList);
      for (var i = 0; i < adDataCount; i += 1) {
        var adPin = window.pin.createAdPin(adDataList[i]);
        console.log('adPin: ' + adPin);
        usersPinList.push(adPin);
        fragment.appendChild(adPin);
        adPin.addEventListener('mousedown', onAdPinClick);
        adPin.addEventListener('keydown', onAdPinClick);
      }
    } else {
      console.log('usersPinList.length === ' + usersPinList.length);
      for (var j = 0; j < usersPinList.length; j += 1) {
        adPin = usersPinList[j];
        fragment.appendChild(adPin);
        adPin.addEventListener('mousedown', onAdPinClick);
        adPin.addEventListener('keydown', onAdPinClick);
      }
    }
    mapPins.appendChild(fragment);
    console.log(usersPinList);
  };


  return {
    map: map,
    mapPins: mapPins,
    usersPinList: usersPinList,
    renderCard: renderCard,
    renderPins: renderPins
  };

})();
