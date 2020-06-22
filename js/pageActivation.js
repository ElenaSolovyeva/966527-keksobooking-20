'use strict';

window.pageActivation = (function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormAddress = adForm.querySelector('#address');

  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFilterSelects = mapFiltersForm.querySelectorAll('select');
  var mapFilterInputs = mapFiltersForm.querySelectorAll('input');


  var onMainPinClick = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      if (window.map.map.classList.contains('map--faded')) { // если по пину кликают на уже активированной странице, класса 'map--faded' нет
        window.map.map.classList.remove('map--faded');
        if (window.form.adForm.classList.contains('ad-form--disabled')) {
          window.form.adForm.classList.remove('ad-form--disabled');
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

        if (document.querySelectorAll('.map__pin').length <= 1) {
          window.map.renderPins();
        }
        adFormAddress.setAttribute('readonly', true);
        window.form.adFormPrice.placeholder = 1000; // при активации формы по умолчанию указывается цена за квартиру
        window.form.adFormPrice.value = 1000;
        window.pin.setAddress();
      }
    }
  };

  window.pin.mainPin.addEventListener('mousedown', onMainPinClick);
  window.pin.mainPin.addEventListener('keydown', onMainPinClick);

  return {mapFiltersForm: mapFiltersForm};
})();
