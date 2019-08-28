import AbstractComponent from './abstract-component.js';

export default class Day extends AbstractComponent {
  constructor(number, date) {
    super();
    this._number = number;
    this._date = new Date(date);
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
