import {render} from '../utils/index.js';
import {Position, EVENTS_AMOUNT, CITIES} from '../utils/constants.js';
import DaysList from './days-list.js';
import Day from './day.js';
import EventsList from './events-list.js';
import EventEdit from './event-edit.js';
import Event from './event.js';

export default class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._daysList = new DaysList();
  }

  _renderDay(number, date) {
    const day = new Day(number, date);
    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderEventsList(container) {
    const eventsList = new EventsList();
    render(container, eventsList.getElement(), Position.BEFOREEND);
  }

  _renderEvent(container, cities, number, eventMock) {
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

    render(container, event.getElement(), Position.BEFOREEND);
  }

  init() {
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);

    const dates = [];
    let currentDate = new Date(this._events[0].startTime).toDateString();
    dates.push(currentDate);
    this._renderDay(dates.length, this._events[0].startTime);

    for (let i = 1; i < this._events.length; i++) {
      if (new Date(this._events[i].startTime).toDateString() !== currentDate) {
        currentDate = new Date(this._events[i].startTime).toDateString();
        dates.push(currentDate);
        this._renderDay(dates.length, this._events[i].startTime);
      }
    }

    const days = this._daysList.getElement().querySelectorAll(`.trip-days__item`);

    let j = 0;
    for (let i = 0; i < dates.length; i++) {
      this._renderEventsList(days[i]);
      const eventsList = days[i].querySelector(`.trip-events__list`);

      while ((j < EVENTS_AMOUNT) && (new Date(this._events[j].startTime).toDateString() === dates[i])) {
        this._renderEvent(eventsList, CITIES, j, this._events[j]);
        j++;
      }
    }
  }
}
