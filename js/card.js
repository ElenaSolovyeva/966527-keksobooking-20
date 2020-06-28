'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card');

  var formatRoomsText = function (roomsNumber) {
    var stringRooms;
    if (roomsNumber === 1) {
      stringRooms = 'комната';
    } else if (roomsNumber < 5) {
      stringRooms = 'комнаты';
    } else {
      stringRooms = 'комнат';
    }
    return stringRooms;
  };

  var formatGuestsText = function (guestsNumber) {
    var stringGuests;
    if (guestsNumber === 1) {
      stringGuests = 'гостя';
    } else {
      stringGuests = 'гостей';
    }
    return stringGuests;
  };

  var renderFeaturesList = function (adFeatures, domList) {
    var adFeaturesCount = adFeatures.length;
    var templateFeatures = domList.querySelectorAll('.popup__feature');
    var templateFeaturesCount = templateFeatures.length;
    if (adFeaturesCount > 0) {
      for (var i = 0; i < templateFeaturesCount; i += 1) {
        for (var j = 0; j < adFeaturesCount; j += 1) {
          var className = 'popup__feature--' + adFeatures[j];

          if (templateFeatures[i].classList.contains(className)) {
            templateFeatures[i].textContent = 'adFeatures[j]';
          }
        }
      }
      for (var k = 0; k < templateFeaturesCount; k += 1) {
        if (templateFeatures[k].textContent === '') {
          templateFeatures[k].remove();
        }
      }
    } else {
      domList.remove();
    }
  };

  var renderPhotos = function (adPhotos, img, divPhotos) {
    if (!adPhotos.value) {
      var photosCount = adPhotos.length;
      if (photosCount === 1) {
        img.setAttribute('src', adPhotos);
      } else if (photosCount > 1) {
        img.setAttribute('src', adPhotos[0]);
        for (var i = 1; i < photosCount; i += 1) {
          var nextPhoto = img.cloneNode(true);
          nextPhoto.setAttribute('src', adPhotos[i]);
          divPhotos.appendChild(nextPhoto);
        }
      }
    }
  };

  var createAdCard = function (ad) {
    var newAdCard = cardTemplate.cloneNode(true).content;
    var popupTitle = newAdCard.querySelector('.popup__title');
    var popupAddress = newAdCard.querySelector('.popup__text--address');
    var popupPrice = newAdCard.querySelector('.popup__text--price');
    var popupType = newAdCard.querySelector('.popup__type');
    var popupCapacity = newAdCard.querySelector('.popup__text--capacity');
    var popupTime = newAdCard.querySelector('.popup__text--time');
    var popupFeaturesList = newAdCard.querySelector('.popup__features');
    var popupDescription = newAdCard.querySelector('.popup__description');
    var popupPhotos = newAdCard.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');
    var avatarImg = newAdCard.querySelector('.popup__avatar');

    // Значения, которые интуитивно «пустые», вроде 0, пустой строки, null, undefined и NaN, становятся false.
    if (!ad.offer.title.value) {
      popupTitle.textContent = ad.offer.title;
    } else {
      popupTitle.remove();
    }

    if (!ad.offer.address.value) {
      popupAddress.textContent = ad.offer.address;
    } else {
      popupAddress.remove();
    }

    if (!ad.offer.price.value) {
      popupPrice.textContent = ad.offer.prise;
      popupPrice.insertAdjacentHTML('beforeend', ' &#x20bd;<span>/ночь</span>');
    } else {
      popupPrice.remove();
    }

    if (!ad.offer.type.value) {
      popupType.textContent = ad.offer.type;
    } else {
      popupType.remove();
    }

    if (!ad.offer.rooms.value) {
      popupCapacity.textContent = ad.offer.rooms + ' ' + formatRoomsText(ad.offer.rooms);

      if (!ad.offer.guests.value) {
        var guestsText = ' для ' + ad.offer.guests + ' ' + formatGuestsText(ad.offer.guests);
        popupCapacity.insertAdjacentHTML('beforeEnd', guestsText);
      }
    } else {
      popupCapacity.remove();
    }

    if (!ad.offer.checkin.value) {
      var checkinText = 'Заезд до ' + ad.offer.checkin;
    }

    if (!ad.offer.checkout.value) {
      var checkoutText = 'Выезд до ' + ad.offer.checkout;
    }

    if (!ad.offer.checkin.value && !ad.offer.checkout.value) {
      popupTime.textContent = checkinText + ', ' + checkoutText;
    } else if (!ad.offer.checkin.value && ad.offer.checkout.value) {
      popupTime.textContent = checkinText;
    } else if (ad.offer.checkin.value && !ad.offer.checkout.value) {
      popupTime.textContent = checkoutText;
    } else {
      popupTime.remove();
    }

    popupFeaturesList.textcontent = '';
    renderFeaturesList(ad.offer.features, popupFeaturesList);

    if (!ad.offer.description.value) {
      popupDescription.textContent = ad.offer.description;
    } else {
      popupDescription.remove();
    }

    if (ad.offer.photos.length > 0) {
      renderPhotos(ad.offer.photos, popupPhoto, popupPhotos);
    } else {
      popupPhotos.remove();
    }

    avatarImg.src = ad.author.avatar;

    return newAdCard;
  };


  return {createAdCard: createAdCard};
})();
