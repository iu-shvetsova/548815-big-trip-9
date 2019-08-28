import AbstractComponent from './abstract-component.js';

export default class Menu extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return `
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${this._items[0]}</a>
        ${this._items.slice(1).map((item) => `<a class="trip-tabs__btn" href="#">${item}</a>`).join(``)}
      </nav>
    `;
  }
}
