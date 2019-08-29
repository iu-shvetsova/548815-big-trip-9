'use strict';

import {Position, EVENTS_AMOUNT, MENU_ITEMS, FILTERS} from './utils/constants.js';
import {render} from './utils/index.js';

import {createEvent} from './mocks/data.js';

import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Route from './components/route.js';
import TotalPrice from './components/total-price.js';
import Sorting from './components/sorting.js';
import TripController from './components/trip-controller.js';

const events = [];

const createEvents = () => {
  for (let i = 0; i < EVENTS_AMOUNT; i++) {
    events[i] = createEvent();
  }
  events.sort((a, b) => a.startTime - b.startTime);
}

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

  const tripController = new TripController(eventsSection, events);
  tripController.init();
};

createEvents();
renderComponents();
