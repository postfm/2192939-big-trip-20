import he from 'he';
import {
  getPointOffers,
  getPointOfferChecked,
  getPointDestination,
  getPointDestinationId,
  getCitiesName,
} from '../utils/points.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createPointOfferList(point, offers) {
  const pointOffers = getPointOffers(point, offers);
  const isPointOffersChecked = getPointOfferChecked(point, pointOffers);
  let pointList = '';
  pointOffers.forEach((pointOffer, index) => {
    pointList += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${pointOffer.id}" type="checkbox" data-offer-id=${pointOffer.id}
      name="event-offer-luggage" ${isPointOffersChecked[index] ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${pointOffer.id}">
        <span class="event__offer-title">${pointOffer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${pointOffer.price}</span>
      </label>
    </div>`;
  });
  return pointList;
}

function createPointPictureList(pointDestination) {
  let pointPhotoList = '';
  pointDestination.pictures.forEach((picture) => {
    pointPhotoList += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });
  return pointPhotoList;
}

function createEditPointFormTemplate(point, destinations, offers) {
  const pointOffers = getPointOffers(point, offers);
  const pointDestination = getPointDestination(point, destinations);

  return/*html*/`<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${pointDestination.name} list="destination-list-1">
      <datalist id="destination-list-1">
      ${getCitiesName(destinations).map((cityName) => `<option value=${cityName}></option>`)}
}
      </datalist >
    </div >

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${point.basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${pointOffers.length > 0 ? '' : 'visually-hidden'}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createPointOfferList(point, offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination ${pointDestination.description ? '' : 'visually-hidden'}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${he.encode(pointDestination.description)}</p>

        <div class="${pointDestination.pictures ? 'event__photos-container' : 'visually-hidden'}" style='overflow:auto'>
          <div class="event__photos-tape">
            ${pointDestination.pictures ? createPointPictureList(pointDestination) : ''}
          </div>
        </div>

      </section>
    </section>
  </form>
</li > `;
}

class EditPointFormView extends AbstractStatefulView {
  #point = null;
  #destinations = null;
  #offers = null;

  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleDeleteClick = null;

  #datepicker = null;

  constructor({ point, destinations, offers, onFormSubmit, onFormClose, onDeleteClick }) {
    super();
    this.#point = point;
    this._setState(this.#parsePointToState(this.#point));
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #setSettingsDatepicker() {
    return {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true,
      locale: {
        firstDayOfWeek: 1,
      }
    };
  }

  #setDatepickerFrom() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        ...this.#setSettingsDatepicker(),
      }
    );
  }


  #setDatepickerTo() {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        ...this.#setSettingsDatepicker(),
      }
    );
  }

  #parsePointToState(point) {
    return { ...point };
  }

  #parseStateToPoint(state) {
    return { ...state };
  }

  reset(point) {
    this.updateElement(this.#parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceChangeHandler);
    const blockOffers = this.element.querySelector('.event__available-offers');
    if (blockOffers) {
      blockOffers.addEventListener('change', this.#offersChangeHandler);
    }
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#parseStateToPoint(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(this.#parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (evt) => {
    const isDestination = this.#destinations
      .some((destination) => destination.name === evt.target.value);
    evt.preventDefault();
    if (!isDestination) {
      evt.target.value = '';
      return;
    }
    this.updateElement({
      destination: getPointDestinationId(this.#destinations, evt.target.value)
    });
  };

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: Number(evt.target.value)
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();

    const changedOffers = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const offers = [...changedOffers].map((changedOffer) => changedOffer.dataset.offerId);

    this.updateElement({
      offers: [...offers]
    });
  };
}

export default EditPointFormView;
