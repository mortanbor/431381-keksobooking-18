'use strict';

(function () {
  // получаем случайный номер элемента. Элемент массива или данные - вставляем аргументом в функции
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  // получаем непосредственно значение элемента массива по случайно полученному индексу
  var getRandomElement = function (elements) {
    return elements[getRandomInteger(0, elements.length)];
  };

  var setElementsDisabled = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeElementsDisabled = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var setSynchronizeValue = function (donor, acceptor) {
    donor.addEventListener('change', function () {
      acceptor.value = donor.value;
    });
  };

  var findTypeById = function (id) {
    return window.data.TYPES.find(function (item) {
      return item.id === id;
    });
  };

  // заменяет в строке вхождение вида {{something}} на
  // элемент массива data. Число элементов должно быть равно
  // числу элементов вхождений в строку
  var templateRender = function (str, data) {
    var i = -1;
    return str.replace(/{{.*?}}/g, function (match) {
      i++;
      return data[i] || match;
    });
  };

  // находим номер DOM-узла в коллекции
  var getNodeNumber = function (nodeList, node) {
    return Array.from(nodeList).findIndex(function (item) {
      return item === node;
    });
  };

  // обработчик на Esc
  var addEscListener = function(callback) {
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.CLOSE_KEY_CODE) {
        callback();
      }
    });
  };

  // для устранения "дребезга"
  var debounce = function (cb) {
    var lastTimeout = null;

    return function() {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        cb.apply(null, parameters);
      }, window.data.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    setElementsDisabled: setElementsDisabled,
    removeElementsDisabled: removeElementsDisabled,
    findTypeById: findTypeById,
    templateRender: templateRender,
    setSynchronizeValue: setSynchronizeValue,
    getNodeNumber: getNodeNumber,
    addEscListener: addEscListener,
    debounce: debounce
  };
})();
