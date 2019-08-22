import {setTime, setTimeDifference} from '../utils/index.js';

export const getEventComponent = ({type, city, startTime, endTime, price, options}) => `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.icon}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type.name} to ${city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${new Date(startTime).toISOString().slice(0, 16)}">${setTime(new Date(startTime).getHours())}:${setTime(new Date(startTime).getMinutes())}</time>
          &mdash;
          <time class="event__end-time" datetime="${new Date(endTime).toISOString().slice(0, 16)}">${setTime(new Date(endTime).getHours())}:${setTime(new Date(endTime).getMinutes())}</time>
        </p>
        <p class="event__duration">
          ${setTimeDifference(startTime, endTime)}
        </p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${options.filter((item) => item.isChecked).map((item) => `
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
