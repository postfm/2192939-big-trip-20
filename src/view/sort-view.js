import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/const.js';

function createSortViewTemplate(currentSortType) {
  return /*html*/`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DEFAULT ? 'checked' : ''} >
      <label class="trip-sort__btn" for="sort-day" data-sort-type=${SortType.DEFAULT}>Day</label>
  </div >

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event" data-sort-type=${SortType.EVENT}>Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.TIME ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-time" data-sort-type=${SortType.TIME}>Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.PRICE ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-price" data-sort-type=${SortType.PRICE}>Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer" data-sort-type=${SortType.OFFERS}>Offers</label>
  </div>
</form > `;
}

class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortType = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;


    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortViewTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#sortType = evt.target.dataset.sortType;
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(this.#sortType);
  };
}

export default SortView;
