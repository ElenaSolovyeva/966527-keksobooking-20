'use strict';

window.photoLoader = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var housingChooser = document.querySelector('#images');
  var housingPreview = document.querySelector('.ad-form__photo').querySelector('img');

  var onPhotoLoad = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var preview;

    // Не могу сообразить, как по-другому передать в коллбэк агрумент с нужным preview
    switch (evt.target.id) {
      case ('avatar'):
        preview = avatarPreview;
        break;
      case ('images') :
        preview = housingPreview;
        break;
      default:
        preview = null;
    }

    var matches = FILE_TYPES.some(function (current) {
      return fileName.endsWith(current);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', onPhotoLoad);
  housingChooser.addEventListener('change', onPhotoLoad);
})();
