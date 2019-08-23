import {createElement} from '../utils/index.js';

export default class EventsList {
  constructor() {

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
      <ul class="trip-events__list"></ul>
    `;
  }
}
