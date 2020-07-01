'use strict';

/* map.js — модуль, который управляет карточками объявлений и метками:
добавляет на страницу нужную карточку, отрисовывает метки
и осуществляет взаимодействие карточки и метки на карте;
*/

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var usersPinList = [];
  var filteredAdList = [];
  var closeButton;


  var onCloseButtonClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      map.querySelector('.map__card').remove();
    }
  };

  var onEscapeClick = function (evt) {
    if (evt.key === 'Escape') {
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
    document.addEventListener('keydown', onEscapeClick);
  };

  var onAdPinClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      var pinIndex = usersPinList.indexOf(evt.target.parentNode, 0);

      var previousCard = map.querySelector('.map__card');
      if (previousCard) {
        previousCard.remove();
      }

      if (window.map.filteredAdList.length > 0) {
        renderCard(window.map.filteredAdList[pinIndex]);
      } else {
        renderCard(window.adData.adList[pinIndex]);
      }
    }
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    if (usersPinList.length !== 0) {
      usersPinList.splice(0, usersPinList.length);
    }

    data.forEach(function (element) {
      var adPin = window.pin.createAdPin(element);
      usersPinList.push(adPin);
      fragment.appendChild(adPin);
      adPin.addEventListener('mousedown', onAdPinClick);
      adPin.addEventListener('keydown', onAdPinClick);
    });

    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    if (usersPinList.length > 0) {
      usersPinList.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  return {
    map: map,
    mapPins: mapPins,
    usersPinList: usersPinList,
    filteredAdList: filteredAdList,
    renderCard: renderCard,
    renderPins: renderPins,
    removePins: removePins,
    onCloseButtonClick: onCloseButtonClick,
    onEscapeClick: onEscapeClick
  };

})();
