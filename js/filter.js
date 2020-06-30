'use strict';
window.filter = (function () {
  var mapFiltersForm = document.querySelector('.map__filters');

  var currentFilter = {
    type: mapFiltersForm.querySelector('#housing-type'),
    price: mapFiltersForm.querySelector('#housing-price'),
    rooms: mapFiltersForm.querySelector('#housing-rooms'),
    guests: mapFiltersForm.querySelector('#housing-guests'),
    features: []
  };

  var setFilteredFeatures = function () {
    var featuresSelects = mapFiltersForm.querySelector('#housing-features').querySelectorAll('input');
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
      return window.util.compareArrays(ad.offer[key], currentFilter[key]) ? 1 : 0;
    } else {
      return (String(ad.offer[key]) === String(currentFilter[key].value) || currentFilter[key].value === 'any') ? 1 : 0;
    }
    // if (String(ad.offer[key]) === String(currentFilter[key].value) || currentFilter[key].value === 'any') {
    //   return 1;
    // } else {
    //   return 0;
    // }
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
    console.log(filterKeysCount === compilanseRanking);
    return filterKeysCount === compilanseRanking;
  };


  return {
    compareWithCurrentFilter: compareWithCurrentFilter
  };
})();
// wifi: mapFiltersForm.querySelector('#filter-wifi'),
// dishwasher: mapFiltersForm.querySelector('#filter-dishwasher').value,
// parking: mapFiltersForm.querySelector('#filter-parking').value,
// washer: mapFiltersForm.querySelector('#filter-washer').value,
// elevator: mapFiltersForm.querySelector('#filter-elevator').value,
// conditioner: mapFiltersForm.querySelector('#filter-conditioner').value,
