'use strict';

(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var filtersBlock = filtersContainer.querySelector('.map__filters');
  var filtersNodes = filtersBlock.querySelectorAll('.map__filter');
  var widthMap = map.offsetWidth;

  window.map = {
    node: map,
    filtersContainer: filtersContainer,
    filtersBlock: filtersBlock,
    filtersNodes: filtersNodes,
    width: widthMap
  };
})();
