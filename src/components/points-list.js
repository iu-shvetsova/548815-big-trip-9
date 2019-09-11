import AbstractComponent from './abstract-component.js';

export default class PointsList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <ul class="trip-events__list"></ul>
    `;
  }
}
