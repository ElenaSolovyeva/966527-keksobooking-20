'use strict';

window.pageDeactivation = (function () {

  var disableForm = function (form, className) {
    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');
    if (!(form.classList.contains(className + '--disabled'))) {
      form.classList.add(className + '--disabled');
    }
    if (selects) {
      for (var i = 0; i < selects.length; i += 1) {
        selects[i].disabled = true;
      }
    }
    if (inputs) {
      for (var j = 0; j < inputs.length; j += 1) {
        inputs[i].disabled = true;
      }
    }
  };

  var makePageInactive = function () {
    if (!(window.map.map.classList.contains('.map--faded'))) {
      window.map.map.classList.add('map--faded');
    }
    disableForm(window.form.adForm, 'ad-form');
    disableForm(window.pageActivation.mapFiltersForm, 'map__filters');

    var invalidFieldsCount = window.form.invalidFields.length;
    if (invalidFieldsCount > 0) {
      window.form.invalidFields.splice(0, invalidFieldsCount); // обнуляет массив невалидных полей
    }

    window.pin.setAddress();

    // удаляет обработчики при деактивации страницы
    window.pin.mainPin.removeEventListener('mousedown', window.pageActivation.MainPinClick);
    window.pin.mainPin.removeEventListener('keydown', window.pageActivation.onMainPinClick);
    if (window.map.usersPinList.length > 0) {
      window.pin.adPin.removeEventListener('mousedown', window.pin.onAdPinClick);
      window.pin.adPin.removeEventListener('keydown', window.pin.onAdPinClick);
    }
    if (window.map.closeButton) { // card.js
      window.map.closeButton.removeEventListener('mousedown', window.map.onCloseButtonClick);
      window.map.closeButton.removeEventListener('keydown', window.map.onCloseButtonClick);
    }
  };

  return {makePageInactive: makePageInactive};
})();
