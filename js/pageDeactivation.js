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

    window.formReset.resetForm(window.form.adForm, '');
    window.formReset.resetForm(window.pageActivation.mapFiltersForm, 'any');

    var invalidFieldsCount = window.form.invalidFields.length;
    if (invalidFieldsCount > 0) {
      window.form.invalidFields.splice(0, invalidFieldsCount); // обнуляет массив невалидных полей
    }
    window.pin.setMainPinCentral();
    window.pin.setAddress();

    // Очищает список отфильтрованных объявлений
    window.map.filteredAdList.splice(0, window.map.filteredAdList.length);

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

  // ОТПРАВКА ФОРМЫ
  var onSubmitClick = function (submitEvt) {
    submitEvt.preventDefault();

    var data = new FormData(window.form.adForm);

    var onUpload = function () {
      var successTemplate = document.querySelector('#success').content;
      var successBlock = successTemplate.cloneNode(true);
      document.querySelector('main').insertAdjasentText('afterbegin', successBlock);

      document.addEventListener('mousedown', function () {
        successBlock.parentNode.removeChild(successBlock);
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
          successBlock.parentNode.removeChild(successBlock);
        }
      });

      makePageInactive();
    };

    var onError = function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorBlock = errorTemplate.cloneNode(true);
      document.querySelector('main').insertAdjacentElement('afterbegin', errorBlock);

      var errorButton = errorBlock.querySelector('.error__button');

      var onErrorbuttonClick = function (evt) {
        if (evt.button === 0 || evt.key === 'Enter') {
          document.querySelector('.error').remove();
          errorButton.removeEventListener('click', onErrorbuttonClick);
          errorButton.removeEventListener('keydown', onErrorbuttonClick);
        }
      };

      var onErrorWindowClick = function (evt) {
        if (evt.key === 'Escape') {
          document.querySelector('.error').remove();
          document.removeEventListener('keydown', onErrorWindowClick);
        }
      };

      errorButton.addEventListener('click', onErrorbuttonClick);
      errorButton.addEventListener('keydown', onErrorbuttonClick);
      document.addEventListener('keydown', onErrorWindowClick);
    };

    window.adData.save(onUpload, onError, data);
  };

  window.form.adForm.addEventListener('submit', onSubmitClick);

  return {makePageInactive: makePageInactive};
})();
