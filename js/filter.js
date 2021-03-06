'use strict';
window.filter = (function () {

  var mapFiltersForm = document.querySelector('.map__filters');
  var featuresSelects = mapFiltersForm.querySelector('#housing-features').querySelectorAll('input');

  var currentFilter = {
    type: mapFiltersForm.querySelector('#housing-type'),
    price: mapFiltersForm.querySelector('#housing-price'),
    rooms: mapFiltersForm.querySelector('#housing-rooms'),
    guests: mapFiltersForm.querySelector('#housing-guests'),
    features: []
  };

  var setFilteredFeatures = function () {
    var features = [];
    featuresSelects.forEach(function (select) {
      if (select.checked === true) {
        features.push(select.value);
      }
    });
    currentFilter.features.splice(0, currentFilter.features.length);
    currentFilter.features = features.slice();
  };

  var compare = function (ad, key) {
    if (Array.isArray(ad.offer[key])) {
      if (currentFilter[key].length === 0) {
        return 1;
      }
      // Содержатся ли все выбранные в фильтре features в объявлении пользователя?
      return window.util.isSubset(currentFilter[key], ad.offer[key]) ? 1 : 0;
    } else if (key === 'price') {
      return (window.util.checkPriceRange(ad.offer[key], currentFilter[key].value)) ? 1 : 0;
    } else {
      return (String(ad.offer[key]) === String(currentFilter[key].value) || currentFilter[key].value === 'any') ? 1 : 0;
    }
  };

  var compareWithCurrentFilter = function (ad) {
    var filterKeys = Object.keys(currentFilter);
    var filterKeysCount = filterKeys.length;
    setFilteredFeatures();
    var compilanseRanking = filterKeys.reduce(
        function (acc, key) {
          acc += compare(ad, key);
          return acc;
        },
        0
    );
    return filterKeysCount === compilanseRanking;
  };


  return {
    compareWithCurrentFilter: compareWithCurrentFilter,
    featuresSelects: featuresSelects,
    currentFilter: currentFilter
  };
})();
