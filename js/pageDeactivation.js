'use strict';

window.pageDeactivation = (function () {
  var adFormReset = window.form.adForm.querySelector('.ad-form__reset');

  // ДЕАКТИВАЦИЯ СТРАНИЦЫ
  var makePageInactive = function () {
    var userPins = document.querySelectorAll('.map__pin--users-pin');
    var userPinsCount = userPins.length;

    if (!(window.map.map.classList.contains('.map--faded'))) {
      window.map.map.classList.add('map--faded');
    }
    if (!(window.form.adForm.classList.contains('ad-form--disabled'))) {
      window.form.adForm.classList.add('ad-form--disabled');
    }

    if (userPinsCount > 0) {
      for (var i = 0; i < userPinsCount; i += 1) {
        userPins[i].parentNode.removeChild(userPins[i]);
      }
    }

    window.formReset.resetForm(window.form.adForm);
    window.formReset.resetForm(window.pageActivation.mapFiltersForm);

    var invalidFieldsCount = window.form.invalidFields.length;
    if (invalidFieldsCount > 0) {
      window.form.invalidFields.splice(0, invalidFieldsCount); // обнуляет массив невалидных полей
    }
    window.pin.setMainPinCentral();
    window.pin.setAddress();

    // удаляет обработчики при деактивации страницы
    window.pin.mainPin.removeEventListener('mousedown', window.pageActivation.MainPinClick);
    window.pin.mainPin.removeEventListener('keydown', window.pageActivation.onMainPinClick);


    if (window.map.closeButton) {
      window.map.closeButton.removeEventListener('mousedown', window.map.onCloseButtonClick);
      window.map.closeButton.removeEventListener('keydown', window.map.onCloseButtonClick);
    }
  };

  adFormReset.addEventListener('mousedown', makePageInactive);
  adFormReset.addEventListener('keydown', makePageInactive);


  return {makePageInactive: makePageInactive};
})();
