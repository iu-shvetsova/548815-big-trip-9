import {generateFilterID} from '../utils/index.js';

export const getFilterComponent = (items) => `
  <form class="trip-filters" action="#" method="get">
    ${items.map((item) => `
      <div class="trip-filters__filter">
        <input id="${generateFilterID(item)}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${item.toLowerCase()}" checked>
        <label class="trip-filters__filter-label" for="${generateFilterID(item)}">${item}</label>
      </div>
    `).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
