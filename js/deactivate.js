'use strict';

(function () {

  var deactivate = function () {
    window.form.successPostBlock.classList.add('hidden');
    window.pins.similarListElement.innerHTML = '';
    window.cards.removeCard();
    window.pins.similarListElement.innerHTML = '';
    window.mainPin.setToStart();
    window.map.node.classList.add('map--faded');
    window.form.node.classList.add('ad-form--disabled');
    window.utils.setElementsDisabled(window.map.filtersNodes);
    window.utils.setElementsDisabled(window.form.node);
    window.form.resetButton.click();
    window.form.node.reset();
    window.files.setDefaults();
    window.data.isActive = false;
    window.pins.data = [];
    setTimeout(function () {
      window.form.fieldAddress.value = window.data.startAddress;
    }, 0);
  };

  var successKeyCloseHandler = function (evt) {
    if (window.data.isActive && evt.keyCode === window.data.CLOSE_KEY_CODE) {
      deactivate();
      window.removeEventListener('keydown', successKeyCloseHandler);
    }
  };

  window.form.successPostBlock.addEventListener('click', deactivate);

  window.deactivate = {
    do: deactivate,
    successCloseHandler: successKeyCloseHandler
  };
})();
