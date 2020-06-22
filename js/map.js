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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.adData.adList.length; i += 1) {
      var adPin = window.pin.createAdPin(window.adData.adList[i]);
      usersPinList.push(adPin);
      fragment.appendChild(adPin);
      adPin.addEventListener('mousedown', onAdPinClick);
      adPin.addEventListener('keydown', onAdPinClick);
    }
    mapPins.appendChild(fragment);
  };


  return {
    map: map,
    usersPinList: usersPinList,
    renderCard: renderCard,
    renderPins: renderPins
  };

})();
