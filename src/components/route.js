import AbstractComponent from './abstract-component.js';

export default class Route extends AbstractComponent {
  constructor(startDate, endDate, events) {
    super();
    this._startDate = startDate;
    this._endDate = endDate;
    this._events = events;
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
