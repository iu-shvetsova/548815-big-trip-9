import {setRoute, setDates} from '../utils/index.js';
import AbstractComponent from './abstract-component.js';

export default class Route extends AbstractComponent {
  constructor(startDate, endDate, points) {
    super();
    this._startDate = startDate;
    this._endDate = endDate;
    this._points = points;
  }

  getTemplate() {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${setRoute(this._points)}
        </h1>

        <p class="trip-info__dates">${setDates(this._startDate, this._endDate)}</p>
      </div>
    `;
  }
}
