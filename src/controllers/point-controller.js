import {render} from '../utils/index.js';
import {Position, Mode} from '../utils/constants.js';
import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import PointNew from '../components/point-new.js';
import flatpickr from 'flatpickr';

export default class PointController {
  constructor(container, mode, cities, number, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._startTime = null;
    this._endTime = null;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._pointView = new Point(data);
    this._pointEdit = new PointEdit(cities, number, data);
    this._pointNew = new PointNew(cities, data);

    if (mode === Mode.ADDING) {
      this._add();
    } else {
      this._init();
    }
  }

  setDefaultView() {
    if (this._container.contains(this._pointEdit.getElement())) {
      this._pointEdit.getElement().replaceWith(this._pointView.getElement());
    }
  }

  _getOptions() {
    const newOptions = [];
    this._pointEdit.getElement().querySelectorAll(`.event__offer-selector`).forEach((option) => {
      newOptions.push({
        name: option.querySelector(`.event__offer-title`).innerText,
        price: option.querySelector(`.event__offer-price`).innerText,
        isChecked: option.querySelector(`.event__offer-checkbox`).checked
      });
    });
    return newOptions;
  }

  _generateEntry(formData) {
    return {
      type: {
        name: `Bus`,
        icon: `bus.png`
      }, // временно!!!!
      city: formData.get(`event-destination`),
      startTime: this._startTime.selectedDates[0],
      endTime: this._endTime.selectedDates[0],
      price: formData.get(`event-price`),
      options: this._getOptions(),
      description: this._data.description, // временно тож!!!!!
      photos: this._data.photos
    };
  }

  _add() {
    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._pointNew.getElement());
      const entry = this._generateEntry(formData);
      this._onDataChange(entry, null);
      this._pointNew.getElement().remove();
    };

    this._startTime = flatpickr(this._pointNew.getElement().querySelector(`.event__input--time[name='event-start-time']`), {
      defaultDate: this._data.startTime,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._endTime = flatpickr(this._pointNew.getElement().querySelector(`.event__input--time[name='event-end-time']`), {
      defaultDate: this._data.endTime,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._startTime = flatpickr(this._pointNew.getElement().querySelector(`.event__input--time[name='event-start-time']`), {
      defaultDate: this._data.startTime,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._endTime = flatpickr(this._pointNew.getElement().querySelector(`.event__input--time[name='event-end-time']`), {
      defaultDate: this._data.endTime,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._pointNew.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      onSaveButtonClick(evt);
    });

    render(document.querySelector(`.trip-events__trip-sort`), this._pointNew.getElement(), Position.AFTEREND);
  }

  _init() {
    const onSaveButtonClick = () => {
      let data = this._data;
      let formData = new FormData(this._pointEdit.getElement());
      const entry = this._generateEntry(formData);
      this._onDataChange(entry, data);
    };

    this._startTime = flatpickr(this._pointEdit.getElement().querySelector(`.event__input--time[name='event-start-time']`), {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._endTime = flatpickr(this._pointEdit.getElement().querySelector(`.event__input--time[name='event-end-time']`), {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._pointView.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      this._pointView.getElement().replaceWith(this._pointEdit.getElement());
    });

    this._pointEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._pointEdit.getElement().replaceWith(this._pointView.getElement());
    });

    this._pointEdit.getElement().addEventListener(`submit`, () => {
      this._pointEdit.getElement().replaceWith(this._pointView.getElement());
    });

    this._pointEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, onSaveButtonClick);

    this._pointEdit.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      this._onDataChange(null, this._data);
    });

    render(this._container, this._pointView.getElement(), Position.BEFOREEND);
  }
}
