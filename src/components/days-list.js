import AbstractComponent from './abstract-component.js';

export default class DaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <ul class="trip-days"></ul>
    `;
  }
}
