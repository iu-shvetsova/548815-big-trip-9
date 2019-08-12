'use strict';

import {getMenuComponent} from './components/menu.js';
import {getFilterComponent} from './components/filter.js';
import {getRouteComponent} from './components/route.js';
import {getSortingComponents} from './components/sorting.js';
import {getEventEditComponent} from './components/event-edit.js';
import {getDaysListComponent} from './components/days-list.js';
import {getDayComponent} from './components/day.js';
import {getEventsListComponent} from './components/events-list.js';
import {getEventComponent} from './components/event.js';

const tripMainSection = document.querySelector(`.trip-main`);
const infoSection = tripMainSection.querySelector(`.trip-main__trip-info`);
const controlsSection = tripMainSection.querySelector(`.trip-main__trip-controls`);
const controlsTitles = controlsSection.querySelectorAll(`h2`);

const eventsSection = document.querySelector(`.trip-events`);

const renderComponent = (container, component, position) => container.insertAdjacentHTML(position, component);

renderComponent(infoSection, getRouteComponent(), `afterbegin`);
renderComponent(controlsTitles[0], getMenuComponent(), `afterend`);
renderComponent(controlsTitles[1], getFilterComponent(), `afterend`);
renderComponent(eventsSection, getSortingComponents(), `beforeend`);
renderComponent(eventsSection, getEventEditComponent(), `beforeend`);
renderComponent(eventsSection, getDaysListComponent(), `beforeend`);

const daysList = eventsSection.querySelector(`.trip-days`);

renderComponent(daysList, getDayComponent(), `afterbegin`);

const day = daysList.querySelector(`.trip-days__item`);

renderComponent(day, getEventsListComponent(), `beforeend`);

const eventsList = day.querySelector(`.trip-events__list`);

for (let i = 0; i < 3; i++) {
  renderComponent(eventsList, getEventComponent(), `beforeend`);
}
