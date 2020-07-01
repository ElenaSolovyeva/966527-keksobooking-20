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

  return {
    isSubset: isSubset,
    checkPriceRange: checkPriceRange
  };
})();
