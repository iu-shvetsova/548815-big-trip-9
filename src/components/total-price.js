import {createElement} from '../utils/index.js';

export default class TotalPrice {
  constructor(events) {
    this._events = events;
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
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._events.reduce((acc, event) => {
    acc += event.price;
    event.options.filter((item) => item[`isChecked`]).forEach((item) => {
      acc += item[`price`];
    });
    return acc;
  }, 0)}
        </span>
      </p>
    `;
  }
}
