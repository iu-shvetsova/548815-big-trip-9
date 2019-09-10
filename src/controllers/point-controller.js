import {render} from '../utils/index.js';
import {Position} from '../utils/constants.js';
import Point from '../components/point.js';
import PointEdit from '../components/point-edit.js';
import flatpickr from 'flatpickr';

export default class PointController {
  constructor(container, cities, number, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._startTime = null;
    this._endTime = null;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._pointView = new Point(data);
    this._pointEdit = new PointEdit(cities, number, data);

    this.init();
  }

  setDefaultView() {
    if (this._container.contains(this._pointEdit.getElement())) {
      this._pointEdit.getElement().replaceWith(this._pointView.getElement());
    }
  }

  init() {
    this._startTime = flatpickr(this._pointEdit.getElement().querySelectorAll(`.event__input--time[name='event-start-time']`), {
      defaultDate: this._data.startTime,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    this._endTime = flatpickr(this._pointEdit.getElement().querySelector(`.event__input--time[name='event-end-time']`), {
      defaultDate: this._data.endTime,
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

    this._pointEdit.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
      const getOptions = () => {
        const newOptions = [];
        this._pointEdit.getElement().querySelectorAll(`.event__offer-selector`).forEach((option) => {
          newOptions.push({
            name: option.querySelector(`.event__offer-title`).innerText,
            price: option.querySelector(`.event__offer-price`).innerText,
            isChecked: option.querySelector(`.event__offer-checkbox`).checked
          });
        });
        return newOptions;
      };

      const formData = new FormData(this._pointEdit.getElement());

      const entry = {
        type: {
          name: `Bus`,
          icon: `bus.png`
        }, // временно!!!!
        city: formData.get(`event-destination`),
        startTime: this._startTime.selectedDates[0],
        endTime: this._endTime.selectedDates[0],
        price: formData.get(`event-price`),
        options: getOptions(),
        description: this._data.description, // временно тож!!!!!
        photos: this._data.photos
      };

      this._onDataChange(entry, this._data);
    });

    render(this._container, this._pointView.getElement(), Position.BEFOREEND);
  }
}
