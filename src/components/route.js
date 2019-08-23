import {createElement} from '../utils/index.js';

export default class Route {
  constructor(startDate, endDate, events) {
    this._startDate = startDate;
    this._endDate = endDate;
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
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${this._events.length > 3 ? `${this._events[0].city} &mdash; ... &mdash; ${this._events[this._events.length - 1].city}` : this._events.map((item) => item.city).join(` &mdash; `)}
        </h1>

        <p class="trip-info__dates">${new Date(this._startDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}&nbsp;&mdash;&nbsp;${new Date(this._endDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}</p>
      </div>
    `;
  }
}
