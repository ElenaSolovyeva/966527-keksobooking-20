'use strict';
window.filter = (function () {
  var mapFiltersForm = document.querySelector('.map__filters');

  var compareWithCurrentFilter = function (ad) {
    var currentFilter = {
      type: mapFiltersForm.querySelector('#housing-type').value,
      price: mapFiltersForm.querySelector('#housing-price').value,
      rooms: mapFiltersForm.querySelector('#housing-rooms').value,
      guestsFilter: mapFiltersForm.querySelector('#housing-guests').value,

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
      if (ad.offer[key] === currentFilter[key] || currentFilter[key] === 'any') {
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

    console.log('filterKeysCount = ' + filterKeysCount + ', compilanseRanking = ' + compilanseRanking);
    return filterKeysCount === compilanseRanking;
  };


  return {
    compareWithCurrentFilter: compareWithCurrentFilter
  };

})();
