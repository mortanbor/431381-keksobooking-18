'use strict';

(function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var popupAvatar = cardTemplateElement.querySelector('.popup__avatar');
  var popupTitle = cardTemplateElement.querySelector('.popup__title');
  var popupTextAddress = cardTemplateElement.querySelector('.popup__text--address');
  var popupTextPrice = cardTemplateElement.querySelector('.popup__text--price');
  var popupType = cardTemplateElement.querySelector('.popup__type');
  var popupTextCapacity = cardTemplateElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardTemplateElement.querySelector('.popup__text--time');
  var popupFeatures = cardTemplateElement.querySelector('.popup__features');
  var popupDescription = cardTemplateElement.querySelector('.popup__description');
  var popupPhotos = cardTemplateElement.querySelector('.popup__photos');
  var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo').cloneNode(true);
  var popupClose = cardTemplateElement.querySelector('.popup__close');

  var renderByCond = function (node, cond, callback) {
    if (cond) {
      node.classList.remove('hidden');
      callback();
    } else {
      node.classList.add('hidden');
    }
  };

  var renderCard = function (data) {
    var offer = data.offer;
    var arrayToCapacity = [offer.rooms, offer.guests];
    var arrayToCheck = [offer.checkin, offer.checkout];
    var currentPrice = offer.price + window.data.CURRENCY_PER_NIGHT;
    var currentName = window.utils.findTypeById(offer.type).name;

    renderByCond(popupAvatar, data.author.avatar, function () {
      popupAvatar.src = data.author.avatar;
    });
    renderByCond(popupTitle, offer.title, function () {
      popupTitle.innerText = offer.title;
    });
    renderByCond(popupTextAddress, offer.address, function () {
      popupTextAddress.innerText = offer.address;
    });
    renderByCond(popupTextPrice, currentPrice, function () {
      popupTextPrice.innerText = currentPrice;
    });
    renderByCond(popupType, currentName, function () {
      popupType.innerText = currentName;
    });
    renderByCond(popupDescription, offer.description, function () {
      popupDescription.innerText = offer.description;
    });
    renderByCond(popupTextCapacity, offer.rooms && offer.guests, function () {
      // Если комнат или гостей нет, то не перерисовываем и не показываем
      popupTextCapacity.innerText = window.utils.templateRender(window.data.TEMPLATE_CAPACITY, arrayToCapacity);
    });
    renderByCond(popupTextTime, offer.checkin && offer.checkout, function () {
      // Если времени нет, то не перерисовываем и не показываем
      popupTextTime.innerText = window.utils.templateRender(window.data.TEMPLATE_CHECK, arrayToCheck);
    });
    renderByCond(popupFeatures, offer.features.length, function () {
      // Если удобств нет, не перерисовываем и не показываем
      popupFeatures.innerHTML = '';
      offer.features.forEach(function (item) {
        var li = document.createElement('li');
        li.classList.add('popup__feature', 'popup__feature--' + item);
        popupFeatures.appendChild(li);
      });
    });
    renderByCond(popupPhotos, offer.photos.length, function () {
      // Если фоток нет, не перерисовываем и не показываем
      popupPhotos.innerHTML = '';
      offer.photos.forEach(function (item) {
        var img = popupPhotoTemplate.cloneNode(true);
        img.src = item;
        popupPhotos.appendChild(img);
      });
    });

    cardTemplateElement.classList.remove('hidden');
  };

  var removeCard = function () {
    popupClose.removeEventListener('click', hideCard);
    cardTemplateElement.remove();
  };

  var hideCard = function () {
    cardTemplateElement.classList.add('hidden');
  };

  var initCard = function () {
    hideCard();
    window.map.filtersContainer.insertAdjacentElement('beforebegin', cardTemplateElement);
  };

  popupClose.addEventListener('click', hideCard);

  window.utils.addEscListener(function () {
    hideCard();
  });

  window.cards = {
    renderCard: renderCard,
    hideCard: hideCard,
    removeCard: removeCard,
    initCard: initCard
  };
})();
