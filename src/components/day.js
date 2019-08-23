import {createElement} from '../utils/index.js';

export default class Day {
  constructor(number, date) {
    this._number = number;
    this._date = new Date(date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `
      <li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${this._number}</span>
          <time class="day__date" datetime="${this._date.toISOString().slice(0, 16)}">${this._date.toDateString().slice(-11, -4)}</time>
        </div>
      </li>
    `;
  }
}
