'use strict';

import {Position, EVENTS_AMOUNT, MENU_ITEMS, FILTERS, CITIES} from './utils/constants.js';
import {render} from './utils/index.js';

import {createEvent} from './mocks/data.js';

import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Route from './components/route.js';
import TotalPrice from './components/total-price.js';
import Sorting from './components/sorting.js';
// import {getNewEventComponent} from './components/event-new.js';
import EventEdit from './components/event-edit.js';
import DaysList from './components/days-list.js';
import Day from './components/day.js';
import EventsList from './components/events-list.js';
import Event from './components/event.js';

const events = [];

const createEvents = () => {
  for (let i = 0; i < EVENTS_AMOUNT; i++) {
    events[i] = createEvent();
  }
  events.sort((a, b) => a.startTime - b.startTime);
}

const renderComponent = (container, component, position) => container.insertAdjacentHTML(position, component);

const renderComponents = () => {
  const renderMenu = (data) => {
    const menu = new Menu(data);
    render(controlsTitles[0], menu.getElement(), Position.AFTEREND);
  };

  const renderFilter = (data) => {
    const filter = new Filter(data);
    render(controlsTitles[1], filter.getElement(), Position.AFTEREND);
  };

  const renderRoute = () => {
    const route = new Route(events[0].startTime, events[EVENTS_AMOUNT - 1].startTime, events);
    render(infoSection, route.getElement(), Position.AFTERBEGIN);
  };

  const renderTotalPrice = () => {
    const totalPrice = new TotalPrice(events);
    render(infoSection, totalPrice.getElement(), Position.BEFOREEND);
  };

  const renderSorting = () => {
    const sotring = new Sorting();
    render(eventsSection, sotring.getElement(), Position.BEFOREEND);
  };

  const renderDaysList = () => {
    const daysList = new DaysList();
    render(eventsSection, daysList.getElement(), Position.BEFOREEND)
  }

  const renderDay = (number, date) => {
    const day = new Day(number, date);
    render(daysList, day.getElement(), Position.BEFOREEND);
  }

  const renderEventsList = (position) => {
    const eventsList = new EventsList();
    render(position, eventsList.getElement(), Position.BEFOREEND);
  }

  const renderEvent = (position, cities, number, eventMock) => {
    const event = new Event(eventMock);
    const eventEdit = new EventEdit(cities, number, eventMock);

    event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      event.getElement().replaceWith(eventEdit.getElement());
    });

    eventEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      eventEdit.getElement().replaceWith(event.getElement());
    });

    eventEdit.getElement().addEventListener(`submit`, () => {
      eventEdit.getElement().replaceWith(event.getElement());
    });

    render(position, event.getElement(), Position.BEFOREEND);
  };

  const tripMainSection = document.querySelector(`.trip-main`);
  const infoSection = tripMainSection.querySelector(`.trip-main__trip-info`);
  const controlsSection = tripMainSection.querySelector(`.trip-main__trip-controls`);
  const controlsTitles = controlsSection.querySelectorAll(`h2`);

  const eventsSection = document.querySelector(`.trip-events`);

  renderRoute();
  renderTotalPrice();
  renderMenu(MENU_ITEMS);
  renderFilter(FILTERS);
  renderSorting();
  renderDaysList();

  const dates = [];
  let currentDate = new Date(events[0].startTime).toDateString();
  dates.push(currentDate);
  const daysList = eventsSection.querySelector(`.trip-days`);
  renderDay(dates.length, events[0].startTime);

  for (let i = 1; i < events.length; i++) {
    if (new Date(events[i].startTime).toDateString() !== currentDate) {
      currentDate = new Date(events[i].startTime).toDateString();
      dates.push(currentDate);
      renderDay(dates.length, events[i].startTime);
    }
  }

  const days = daysList.querySelectorAll(`.trip-days__item`);

  let j = 0;
  for (let i = 0; i < dates.length; i++) {
    renderEventsList(days[i]);
    const eventsList = days[i].querySelector(`.trip-events__list`);

    while ((j < EVENTS_AMOUNT) && (new Date(events[j].startTime).toDateString() === dates[i])) {
      renderEvent(eventsList, CITIES, j, events[j]);
      j++;
    }
  }
};

createEvents();
renderComponents();
