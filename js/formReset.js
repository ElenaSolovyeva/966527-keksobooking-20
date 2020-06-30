'use strict';

window.formReset = (function () {


  var resetForm = function (form, defaultValue) {
    var card = document.querySelector('.map__card');

    var selects = form.querySelectorAll('select');
    var inputs = form.querySelectorAll('input');

    if (selects.length > 0) {
      for (var i = 0; i < selects.length; i += 1) {
        selects[i].disabled = true;
        selects[i].value = defaultValue;
      }
    }
    if (inputs.length > 0) {
      for (var j = 0; j < inputs.length; j += 1) {
        inputs[j].disabled = true;
        inputs[j].value = '';
      }
      if (inputs[i].type === 'checkbox') {
        inputs[i].checked = false;
      }
    }
    var userPinCount = window.map.usersPinList.length;
    if (userPinCount > 0) {
      for (var k = 0; k < userPinCount; k += 1) {
        window.map.usersPinList[k].removeEventListener('mousedown', window.pin.onAdPinClick);
        window.map.usersPinList[k].removeEventListener('keydown', window.pin.onAdPinClick);
      }

    }
    // console.log(card);
    if (card) {
      card.remove(); // не работает
    }
  };


  return {
    resetForm: resetForm
  };
})();
