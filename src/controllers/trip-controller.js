import {setRoute, setDates, setTotalPrice, render} from '../utils/index.js';
import {Position, POINTS_AMOUNT, CITIES} from '../utils/constants.js';
import DaysList from '../components/days-list.js';
import Day from '../components/day.js';
import PointsList from '../components/points-list.js';
import PointController from './point-controller.js';

export default class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._daysList = new DaysList();

    this._subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
  }

  _renderDay(number, date) {
    const day = new Day(number, date);
    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderPointsList(container) {
    const pointsList = new PointsList();
    render(container, pointsList.getElement(), Position.BEFOREEND);
  }

  _generatePointsDates() {
    const dates = [];
    let currentDate = new Date(this._points[0].startTime).toDateString();
    dates.push(currentDate);
    this._renderDay(dates.length, this._points[0].startTime);

    for (let i = 1; i < this._points.length; i++) {
      if (new Date(this._points[i].startTime).toDateString() !== currentDate) {
        currentDate = new Date(this._points[i].startTime).toDateString();
        dates.push(currentDate);
        this._renderDay(dates.length, this._points[i].startTime);
      }
    }

    return dates;
  }

  _renderPoint(container, cities, number, pointMock) {
    const pointController = new PointController(container, cities, number, pointMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _renderPoints(pointsDates) {
    const days = this._daysList.getElement().querySelectorAll(`.trip-days__item`);

    let j = 0;
    for (let i = 0; i < pointsDates.length; i++) {
      this._renderPointsList(days[i]);
      const pointsList = days[i].querySelector(`.trip-events__list`);

      while ((j < POINTS_AMOUNT) && (new Date(this._points[j].startTime).toDateString() === pointsDates[i])) {
        this._renderPoint(pointsList, CITIES, j, this._points[j]);
        j++;
      }
    }
  }

  _updatePoints() {
    this._points = this._points.sort((a, b) => a.startTime - b.startTime);

    document.querySelector(`.trip-info__title`).innerHTML = setRoute(this._points);
    document.querySelector(`.trip-info__dates`).innerHTML = setDates(this._points[0].startTime, this._points[this._points.length - 1].startTime);
    document.querySelector(`.trip-info__cost-value`).innerText = setTotalPrice(this._points);

    this._daysList.getElement().innerHTML = ``;
    const pointsDates = this._generatePointsDates();
    this._renderPoints(pointsDates);
  }

  _onDataChange(newData, oldData) {
    this._points[this._points.findIndex((point) => point === oldData)] = newData;
    this._updatePoints();
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  init() {
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);

    const pointsDates = this._generatePointsDates();
    this._renderPoints(pointsDates);

  }
}
