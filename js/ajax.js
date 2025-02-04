'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorBlock = errorTemplate.cloneNode(true);
  var errorStatusBlock = errorBlock.querySelector('.error__message');
  var successHandler = null;
  var xhr = new XMLHttpRequest();

  var ajaxHandler = function (url, method, payload) {
    xhr.open(method, url);
    xhr.send(payload);
  };

  var errorHandler = function (status) {
    errorStatusBlock.innerHTML = status;
    errorBlock.classList.remove('hidden');
  };

  var errorCloseHandler = function () {
    errorBlock.classList.add('hidden');
  };

  xhr.responseType = 'json';
  xhr.timeout = window.data.RES_TIMEOUT;

  errorBlock.addEventListener('click', errorCloseHandler);

  window.utils.addEscListener(errorCloseHandler);

  xhr.addEventListener('load', function () {
    if (xhr.status === window.data.RES_SUCCESS_CODE) {
      successHandler(xhr.response);
    } else {
      errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    errorHandler('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  errorBlock.classList.add('hidden');
  document.body.appendChild(errorBlock);

  window.ajax = function (foreignUrl, foreignSuccessHandler, foreignMethod, foreignPayload) {
    successHandler = foreignSuccessHandler || null;
    ajaxHandler(foreignUrl, foreignMethod || 'GET', foreignPayload || null);
  };
})();
