'use strict';

// window.pageDeactivation.makePageInactive();

// ***** РАЗБИВКА НА МОДУЛИ: *****

// ФУНКЦИИ ОБЩЕГО НАЗНАЧЕНИЯ:  util.js
//    return {
//      getRandomInteger: getRandomInteger,
//     shuffle: shuffle,
//     getRandomElements: getRandomElements
//    };

// ВАЛИДАЦИЯ ФОРМЫ С ОБРАБОТЧИКАМИ ДЛЯ ВАЛИДАЦИИ: form.js
//  return {
//    adForm: adForm,
//    adFormTitle: adFormTitle,
//    adFormPrice: adFormPrice,
//    adFormType: adFormType,
//    timeIn: timeIn,
//    timeOut: timeOut,
//    roomsNumberSelect: roomsNumberSelect,
//    capacitySelect: capacitySelect,
//    invalidFields: invalidFields,
//  };

// СОЗДАНИЕ ОБЪЯВЛЕНИЯ И СПИСКА ОБЪЯВЛЕНИЙ: adData.js
//    return adList;

// СОЗДАНИЕ И ОТРИСОВКА КАРТОЧКИ ОБЪЯВЛЕНИЯ:  card.js
//    return {createAdCard: createAdCard};

// СОЗДАНИЕ И ОТРИСОВКА МЕТКИ ОБЪЯВЛЕНЯ: pin.js
//      return {
//        mainPin: mainPin,
//        createAdPin: createAdPin,
//        setAddress: setAddress,
//        setMainPinCentral: setMainPinCentral
//      };

// ОТРИСОВКА КАРТОЧЕК И МЕТОК: map.js
//     return {
//       map: map,
//       usersPinList: usersPinList,
//       mapPins: mapPins,
//       renderCard: renderCard,
//       renderPins: renderPins
//     };

//  ОЧИСТКА ФОРМЫ:  formReset.js
//      return {resetForm: resetForm};

// АКТИВАЦИЯ СТРАНИЦЫ:  pageActivation.js
//     var onMainPinClick = function (evt) {
//     window.pin.mainPin.addEventListener('mousedown', onMainPinClick);
//     window.pin.mainPin.addEventListener('keydown', onMainPinClick);
//     return {mapFiltersForm: mapFiltersForm};


// ДЕАКТИВАЦИЯ СТРАНИЦЫ:  pageDeactivation.js
//        var resetForm = function (form, className) {...}
//      return { makePageInactive: makePageInactive };

// ТОЧКА ВХОДА: main.js
