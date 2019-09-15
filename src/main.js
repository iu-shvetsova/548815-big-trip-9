'use strict';

import {Position, POINTS_AMOUNT, MENU_ITEMS, FILTERS} from './utils/constants.js';
import {render} from './utils/index.js';

import {createPoint} from './mocks/data.js';

import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Route from './components/route.js';
import TotalPrice from './components/total-price.js';
import Sorting from './components/sorting.js';
import Statistics from './components/statistics.js';
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
    const menuItems = menu.getElement().querySelectorAll(`.trip-tabs__btn`);

    const onTabClick = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      menuItems.forEach((item) => {
        item.classList.remove(`trip-tabs__btn--active`);
      });
      evt.target.classList.add(`trip-tabs__btn--active`);

      switch (evt.target.innerText) {
        case `Stats`:
          pointsSection.classList.add(`visually-hidden`);
          bodySection.querySelector(`.statistics`).classList.remove(`visually-hidden`);
          break;
        case `Table`:
          pointsSection.classList.remove(`visually-hidden`);
          bodySection.querySelector(`.statistics`).classList.add(`visually-hidden`);
          break;
      }
    };

    menu.getElement().addEventListener(`click`, (evt) => {
      onTabClick(evt);
    });

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

  const renderStatistics = () => {
    const statistics = new Statistics();
    render(pointsSection, statistics.getElement(), Position.BEFOREEND);
  };

  const headerSection = document.querySelector(`.trip-main`);
  const infoSection = headerSection.querySelector(`.trip-main__trip-info`);
  const controlsSection = headerSection.querySelector(`.trip-main__trip-controls`);
  const controlsTitles = controlsSection.querySelectorAll(`h2`);

  const bodySection = document.querySelector(`.page-body__page-main`);
  const pointsSection = bodySection.querySelector(`.trip-events`);

  renderRoute();
  renderTotalPrice();
  renderMenu(MENU_ITEMS);
  renderFilter(FILTERS);
  renderSorting();
  renderStatistics();

  const tripController = new TripController(pointsSection, points);
  tripController.init();

  headerSection.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
    tripController.createPoint();
  });
};

createPoints();
renderComponents();
