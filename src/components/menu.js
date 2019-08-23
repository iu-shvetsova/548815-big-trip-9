import {createElement} from '../utils/index.js';

export default class Menu {
  constructor(items) {
    this._items = items;
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
      <nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${this._items[0]}</a>
        ${this._items.slice(1).map((item) => `<a class="trip-tabs__btn" href="#">${item}</a>`).join(``)}
      </nav>
    `;
  }
}
