'use strict';

(function () {
  var filters = window.map.filtersBlock;
  var pricePoints = window.data.PRICE_BREAKPOINTS;

  var typesNode = filters.querySelector('#housing-type');
  var priceNode = filters.querySelector('#housing-price');
  var roomsNode = filters.querySelector('#housing-rooms');
  var guestsNode = filters.querySelector('#housing-guests');
  var featuresNodes = filters.querySelectorAll('.map__checkbox');
  var filteredData = [];

  var applyFilter = function (node, key) {
    if (node.value !== 'any') {
      filteredData = filteredData.filter(function (item) {
        return item.offer[key].toString() === node.value;
      });
    }
  };

  var filtersHandler = function () {
    var featuresValues = [];

    filteredData = window.pins.data.slice();
    if (priceNode.value !== 'any') {
      filteredData = filteredData.filter(function (item) {
        if (priceNode.value === 'low') {
          return item.offer.price > 0 && item.offer.price < pricePoints.middle;
        } else if (priceNode.value === 'middle') {
          return item.offer.price >= pricePoints.middle && item.offer.price < pricePoints.high;
        }
        return item.offer.type >= pricePoints.high;
      });
    }
    applyFilter(typesNode, 'type');
    applyFilter(roomsNode, 'rooms');
    applyFilter(guestsNode, 'guests');

    Array.from(featuresNodes).forEach(function (el) {
      if (el.checked) {
        featuresValues.push(el.value);
      }
    });

    if (featuresValues.length) {
      filteredData = filteredData.filter(function (item) {
        var features = item.offer.features;

        if (features.length > 0) {
          featuresValues.forEach(function (el) {
            // если какой-то фичи из выбранных нет в объявлении, оно не подходит
            if (features.indexOf(el) === -1) {
              return false;
            }
          });
        } else {
          return false;
        }
        return true;
      });
    }

    window.pins.filteredData = filteredData;
    window.pins.collectFragment(window.pins.filteredData);
    window.cards.hideCard();
  };

  typesNode.addEventListener('change', filtersHandler);
  priceNode.addEventListener('change', filtersHandler);
  roomsNode.addEventListener('change', filtersHandler);
  guestsNode.addEventListener('change', filtersHandler);

  Array.from(featuresNodes).forEach(function (el) {
    // в отличие от селектов, тут возможен дребезг, поэтому только тут есть смысл устранять
    el.addEventListener('change', window.utils.debounce(filtersHandler));
  });
})();
