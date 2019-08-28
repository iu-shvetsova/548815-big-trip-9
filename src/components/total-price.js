import AbstractComponent from './abstract-component.js';

export default class TotalPrice extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
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
