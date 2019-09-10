'use strict';

import {Position, POINTS_AMOUNT, MENU_ITEMS, FILTERS} from './utils/constants.js';
import {render} from './utils/index.js';

import {createPoint} from './mocks/data.js';

import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Route from './components/route.js';
import TotalPrice from './components/total-price.js';
import Sorting from './components/sorting.js';
import TripController from './controllers/trip-controller.js';

const points = [];

const createPoints = () => {
  for (let i = 0; i < POINTS_AMOUNT; i++) {
    points[i] = createPoint();
  }
  points.sort((a, b) => a.startTime - b.startTime);
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
    const route = new Route(points[0].startTime, points[POINTS_AMOUNT - 1].startTime, points);
    render(infoSection, route.getElement(), Position.AFTERBEGIN);
  };

  const renderTotalPrice = () => {
    const totalPrice = new TotalPrice(points);
    render(infoSection, totalPrice.getElement(), Position.BEFOREEND);
  };

  const renderSorting = () => {
    const sorting = new Sorting();
    render(pointsSection, sorting.getElement(), Position.BEFOREEND);
  };

  const tripMainSection = document.querySelector(`.trip-main`);
  const infoSection = tripMainSection.querySelector(`.trip-main__trip-info`);
  const controlsSection = tripMainSection.querySelector(`.trip-main__trip-controls`);
  const controlsTitles = controlsSection.querySelectorAll(`h2`);

  const pointsSection = document.querySelector(`.trip-events`);

  renderRoute();
  renderTotalPrice();
  renderMenu(MENU_ITEMS);
  renderFilter(FILTERS);
  renderSorting();

  const tripController = new TripController(pointsSection, points);
  tripController.init();
};

createPoints();
renderComponents();
