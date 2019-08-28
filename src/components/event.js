import {setTime, setTimeDifference} from '../utils/index.js';
import AbstractComponent from './abstract-component.js';

export default class Event extends AbstractComponent {
  constructor({type, city, startTime, endTime, price, options}) {
    super();
    this._type = type;
    this._city = city;
    this._startTime = startTime;
    this._endTime = endTime;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `
      <li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type.icon}" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._type.name} to ${this._city}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${new Date(this._startTime).toISOString().slice(0, 16)}">${setTime(new Date(this._startTime).getHours())}:${setTime(new Date(this._startTime).getMinutes())}</time>
              &mdash;
              <time class="event__end-time" datetime="${new Date(this._endTime).toISOString().slice(0, 16)}">${setTime(new Date(this._endTime).getHours())}:${setTime(new Date(this._endTime).getMinutes())}</time>
            </p>
            <p class="event__duration">
              ${setTimeDifference(this._startTime, this._endTime)}
            </p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${this._price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${this._options.filter((item) => item.isChecked).map((item) => `
              <li class="event__offer">
                <span class="event__offer-title">${item.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
              </li>
            `).join(``)}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `;
  }
}
