'use strict';

import {MENU_ITEMS, FILTERS, CITIES} from './utils/constants.js';

import {createEvent} from './mocks/data.js';

import {getMenuComponent} from './components/menu.js';
import {getFilterComponent} from './components/filter.js';
import {getRouteComponent} from './components/route.js';
import {getTotalPriceComponent} from './components/total-price.js';
import {getSortingComponents} from './components/sorting.js';
// import {getNewEventComponent} from './components/event-new.js';
import {getEventEditComponent} from './components/event-edit.js';
import {getDaysListComponent} from './components/days-list.js';
import {getDayComponent} from './components/day.js';
import {getEventsListComponent} from './components/events-list.js';
import {getEventComponent} from './components/event.js';

const EVENTS_AMOUNT = 5;
const events = [];

const createEvents = () => {
  for (let i = 0; i < EVENTS_AMOUNT; i++) {
    events[i] = createEvent();
  }
  events.sort((a, b) => a.startTime - b.startTime);
}

const renderComponent = (container, component, position) => container.insertAdjacentHTML(position, component);

const renderComponents = () => {
  const tripMainSection = document.querySelector(`.trip-main`);
  const infoSection = tripMainSection.querySelector(`.trip-main__trip-info`);
  const controlsSection = tripMainSection.querySelector(`.trip-main__trip-controls`);
  const controlsTitles = controlsSection.querySelectorAll(`h2`);

  const eventsSection = document.querySelector(`.trip-events`);

  events.forEach((item) => console.log(new Date(item.startTime).toDateString()));

  renderComponent(infoSection, getRouteComponent(events[0].startTime, events[EVENTS_AMOUNT - 1].startTime, events), `afterbegin`);
  renderComponent(infoSection, getTotalPriceComponent(events), `beforeend`);
  renderComponent(controlsTitles[0], getMenuComponent(MENU_ITEMS), `afterend`);
  renderComponent(controlsTitles[1], getFilterComponent(FILTERS), `afterend`);
  renderComponent(eventsSection, getSortingComponents(), `beforeend`);
  renderComponent(eventsSection, getDaysListComponent(), `beforeend`);

  const dates = [];
  let currentDate = new Date(events[0].startTime).toDateString();
  dates.push(currentDate);
  const daysList = eventsSection.querySelector(`.trip-days`);
  renderComponent(daysList, getDayComponent(dates.length, events[0].startTime), `afterbegin`);

  for (let i = 1; i < events.length; i++) {
    if (new Date(events[i].startTime).toDateString() !== currentDate) {
      currentDate = new Date(events[i].startTime).toDateString();
      dates.push(currentDate);
      renderComponent(daysList, getDayComponent(dates.length, events[i].startTime), `beforeend`);
    }
  }

  const days = daysList.querySelectorAll(`.trip-days__item`);

  let j = 0;
  for (let i = 0; i < dates.length; i++) {
    renderComponent(days[i], getEventsListComponent(), `beforeend`);
    const eventsList = days[i].querySelector(`.trip-events__list`);

    while ((j < EVENTS_AMOUNT) && (new Date(events[j].startTime).toDateString() === dates[i])) {
      if (j === 0) { // чтобы отрендерить форму редактирования 🥺
        renderComponent(eventsList, getEventEditComponent(CITIES, j, events[j]), `beforeend`);
      } else {
        renderComponent(eventsList, getEventComponent(events[j]), `beforeend`);
      }
      j++;
    }
  }
};

createEvents();
renderComponents();
