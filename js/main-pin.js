'use strict';

(function () {
  var mainPin = window.map.node.querySelector('.map__pin--main');
  var minMainPinY = window.data.MIN_MAP_Y - window.data.MAIN_PIN_HEIGHT;
  var maxMainPinY = window.data.MAX_MAP_Y - window.data.MAIN_PIN_HEIGHT;
  var offsetMainPinHalf = window.data.MAIN_PIN_WIDTH / -2;
  var minMainPinX = offsetMainPinHalf;
  var maxMainPinX = window.map.width + offsetMainPinHalf;
  var startTop = mainPin.style.top;
  var startLeft = mainPin.style.left;

  // получаю координаты нижнего конца метки
  var getPinCoords = function (node, width, height) {
    var top = node.offsetTop;
    var left = node.offsetLeft;
    var x = Math.round(left + width / 2);
    var y = Math.round(top + height);

    return [x, y];
  };

  // callback успешной загрузки данных
  var loadSuccessHandler = function (res) {
    window.pins.data = res;
    window.pins.filteredData = res;
    window.pins.collectFragment(res);
  };

  // активация всей страницы
  var activateMap = function () {
    window.ajax(window.data.ENDPOINT, loadSuccessHandler);
    window.form.node.classList.remove('ad-form--disabled');
    window.map.node.classList.remove('map--faded');

    window.utils.removeElementsDisabled(window.map.filtersNodes);
    window.utils.removeElementsDisabled(window.form.node);

    window.cards.initCard();
    window.data.isActive = true;
  };

  var setPinCoordsToAddress = function () {
    var mainPinCoords = getPinCoords(mainPin, window.data.MAIN_PIN_WIDTH, window.data.MAIN_PIN_HEIGHT);

    // Метод join() объединяет все элементы массива в строку
    var address = mainPinCoords.join(', ');

    if (!window.data.startAddress) {
      window.data.startAddress = address;
    }
    // добавляем значение в инпут адрес координат острого конца главной метки
    window.form.fieldAddress.value = address;
  };

  var setMainPinToStart = function () {
    mainPin.style.top = startTop;
    mainPin.style.left = startLeft;
  };

  var mapPinMainHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX, // координата текущего курсора на котором работает тек.событие
      y: evt.clientY
    };

    var moveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinTop = mainPin.offsetTop - shift.y;
      var pinLeft = mainPin.offsetLeft - shift.x;
      var minTop = Math.max(minMainPinY, pinTop);
      var minLeft = Math.max(minMainPinX, pinLeft);

      mainPin.style.top = Math.min(minTop, maxMainPinY) + 'px';
      mainPin.style.left = Math.min(minLeft, maxMainPinX) + 'px';
    };

    var upHandler = function (upEvt) {
      upEvt.preventDefault();
      if (!window.data.isActive) {
        activateMap();
      }
      setPinCoordsToAddress();
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  mainPin.addEventListener('mousedown', mapPinMainHandler);

  // запись в поле адреса первичных координат метки
  setPinCoordsToAddress();

  window.mainPin = {
    node: mainPin,
    setToStart: setMainPinToStart
  };
})();
