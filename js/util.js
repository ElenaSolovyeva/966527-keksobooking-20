'use strict';

window.util = (function () {
  var compareArrays = function (first, second) {
    if (first.length !== second.length) {
      return false;
    }

    if (first.length === 0 && second.length === 0) {
      return true;
    }

    return first.slice().sort().join('') === second.slice().sort().join('');
  };

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
    getRandomInteger: getRandomInteger,
    shuffle: shuffle,
    getRandomElements: getRandomElements,
    compareArrays: compareArrays
  };
})();
