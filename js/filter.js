'use strict';
window.filter = (function () {
  var mapFiltersForm = document.querySelector('.map__filters');

  var compareWithCurrentFilter = function (ad) {
    var currentFilter = {
      type: mapFiltersForm.querySelector('#housing-type'),
      price: mapFiltersForm.querySelector('#housing-price'),
      rooms: mapFiltersForm.querySelector('#housing-rooms'),
      guestsFilter: mapFiltersForm.querySelector('#housing-guests'),
      // wifi: mapFiltersForm.querySelector('#filter-wifi'),
      // dishwasher: mapFiltersForm.querySelector('#filter-dishwasher').value,
      // parking: mapFiltersForm.querySelector('#filter-parking').value,
      // washer: mapFiltersForm.querySelector('#filter-washer').value,
      // elevator: mapFiltersForm.querySelector('#filter-elevator').value,
      // conditioner: mapFiltersForm.querySelector('#filter-conditioner').value,
    };

    var filterKeys = Object.keys(currentFilter);
    var filterKeysCount = filterKeys.length;

    var compare = function (key) {
      if (String(ad.offer[key]) === String(currentFilter[key].value) || currentFilter[key].value === 'any') {
        return 1;
      } else {
        return 0;
      }
    };

    var compilanseRanking = filterKeys.reduce(
        function (acc, key) {
          acc += compare(key);
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
