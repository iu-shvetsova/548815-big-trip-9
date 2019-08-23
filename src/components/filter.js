import {createElement, generateFilterID} from '../utils/index.js';

export default class Filter {
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
      <form class="trip-filters" action="#" method="get">
        ${this._items.map((item) => `
          <div class="trip-filters__filter">
            <input id="${generateFilterID(item)}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.toLowerCase()}" checked>
            <label class="trip-filters__filter-label" for="${generateFilterID(item)}">${item}</label>
          </div>
        `).join(``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}
