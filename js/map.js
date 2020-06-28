'use strict';

/* map.js — модуль, который управляет карточками объявлений и метками:
добавляет на страницу нужную карточку, отрисовывает метки
и осуществляет взаимодействие карточки и метки на карте;
*/

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var usersPinList = [];
  var
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
    console.log('8) ВЫПОЛНЯЕТСЯ ФУНКЦИЯ-КОЛЛБЭК onAdPinClick');
    if (evt.button === 0 || evt.key === 'Enter') {
      console.log('8А) СОСОТОЯНИЕ МАССИВА usersPinList');
      console.log(usersPinList);
      var pinIndex = usersPinList.indexOf(evt.target.parentNode, 0);
      var previousCard = map.querySelector('.map__card');
      if (previousCard) {
        previousCard.remove();
      }
      console.log('8Б) ВЫЗЫВАЕТСЯ ФУНКЦИЯ renderCard(usersPinList[pinIndex])');
      console.log('8С) ЗНАЧЕНИЕ АРГУМЕНТА (usersPinList[pinIndex])');
      console.log(usersPinList[pinIndex]);
      renderCard(usersPinList[pinIndex]); // window.adData.adList
    }
  };

  var renderPins = function (data) {
    console.log('7) ВЫПОЛНЯЕТСЯ ФУНКЦИЯ renderPins = function (data) {}');
    console.log('7А) СОСОТОЯНИЕ АРГУМЕНТА (data):');
    console.log(data);
    var fragment = document.createDocumentFragment();
    if (usersPinList.length === 0) {
      data.forEach(function (element) {
        var adPin = window.pin.createAdPin(element);
        usersPinList.push(adPin);
        fragment.appendChild(adPin);
        console.log('7Б) НА ПИНЫ НАВЕШИВАЕТСЯ ОБРАБОТЧИК С КОЛЛБЭКОМ onAdPinClick');
        adPin.addEventListener('mousedown', onAdPinClick);
        adPin.addEventListener('keydown', onAdPinClick);
      });
    } else {
      for (var j = 0; j < usersPinList.length; j += 1) {
        var adPin = usersPinList[j];
        fragment.appendChild(adPin);
        adPin.addEventListener('mousedown', onAdPinClick);
        adPin.addEventListener('keydown', onAdPinClick);
      }
    }
    mapPins.appendChild(fragment);
  };


  return {
    map: map,
    mapPins: mapPins,
    usersPinList: usersPinList,
    renderCard: renderCard,
    renderPins: renderPins
  };

})();
