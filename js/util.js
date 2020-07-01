'use strict';

window.util = (function () {
  // Является ли first подмножеством second?
  var isSubset = function (first, second) {
    if (first.length > second.length) {
      return false;
    }
    if (first.length === 0) {
      return true;
    }
    var subset = first.slice().sort();
    var set = second.slice().sort();
    for (var i = 0; i < subset.length; i += 1) {
      if (set.indexOf(subset[i]) < 0) {
        return false;
      }
    }
    return true;
  };

  // Входит ли цена в объявлении пользователя
  // в диапазон цены, выбранной в фильтре?
  var checkPriceRange = function (adPrice, filterRange) {
    var LOW = 10000;
    var HIGH = 50000;
    switch (filterRange) {
      case ('any'):
        return true;
      case ('low'):
        return (adPrice < LOW);
      case ('middle'):
        return (adPrice >= LOW && adPrice <= HIGH);
      case ('high'):

        return (adPrice > HIGH);
      default:
        return false;
    }
  };

  // "Устранение дребезга"
  // var DEBOUNCE_INTERVAL = 500; // ms
  //
  // var debounce = function (cb) {
  //   var lastTimeout = null;
  //
  //   return function () {
  //     var parameters = arguments;
  //     if (lastTimeout) {
  //       window.clearTimeout(lastTimeout);
  //     }
  //     lastTimeout = window.setTimeout(function () {
  //       cb.apply(null, parameters);
  //     }, DEBOUNCE_INTERVAL);
  //   };
  // };

  var getRandomInteger = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  };

  var shuffle = function (array) {
    for (var i = (array.length - 1); i > 0; i -= 1) {
      for (var j = 0; j < i; j += 1) {
        var randomIndex = getRandomInteger(0, j);
        var temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
      }
    }
    return array;
  };

  var getRandomElements = function (array) {
    var mixedArray = shuffle(array);
    var numberOfElements = getRandomInteger(0, array.length - 1);
    var selectedElements = mixedArray.slice(numberOfElements);
    return selectedElements;
  };


  return {
    isSubset: isSubset,
    checkPriceRange: checkPriceRange,
    // debounce: debounce,
    getRandomInteger: getRandomInteger,
    shuffle: shuffle,
    getRandomElements: getRandomElements
  };
})();
