'use strict';

(function () {
  var avatarImg = window.form.node.querySelector('.ad-form-header__preview img');
  var defaultAvatar = avatarImg.src;
  var avatarChooser = window.form.node.querySelector('[name=avatar]');
  var photoContainer = window.form.node.querySelector('.ad-form__photo-container');
  var photoPlace = photoContainer.querySelector('.ad-form__photo');
  var photosChooser = window.form.node.querySelector('[name=images]');

  var loadImage = function (file, callback) {
    var fileName = file.name.toLowerCase();

    var matches = window.data.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        callback(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  var loadAvatarHandler = function (result) {
    avatarImg.src = result;
  };

  var loadPhotoHandler = function (result) {
    var block = document.createElement('div');
    block.classList.add('ad-form__photo');
    block.style.backgroundPosition = '50%';
    block.style.backgroundSize = 'cover';
    block.style.backgroundImage = 'url(' + result + ')';
    photoContainer.appendChild(block);
  };

  avatarChooser.addEventListener('change', function () {
    loadImage(avatarChooser.files[0], loadAvatarHandler);
  });

  photosChooser.addEventListener('change', function () {
    if (photoPlace) {
      photoPlace.remove();
    }

    for (var i = 0; i < photosChooser.files.length; i++) {
      loadImage(photosChooser.files[i], loadPhotoHandler);
    }
  });

  window.files = {
    setDefaults: function () {
      avatarImg.src = defaultAvatar;

      var photoBlocks = photoContainer.querySelectorAll('.ad-form__photo');
      for (var i = 0; i < photoBlocks.length; i++) {
        photoBlocks[i].remove();
      }
      photoContainer.appendChild(photoPlace);
    }
  };
})();
