import {Position} from './constants.js';

export const setRoute = (points) => {
  return points.length > 3 ? `${points[0].city} &mdash; ... &mdash; ${points[points.length - 1].city}` : points.map((item) => item.city).join(` &mdash; `);
};

export const setDates = (startDate, endDate) => {
  return `${new Date(startDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}&nbsp;&mdash;&nbsp;${new Date(endDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}`;
};

export const setTotalPrice = (points) => {
  return points.reduce((acc, point) => {
    acc += +point.price;
    point.options.filter((item) => item[`isChecked`]).forEach((item) => {
      acc += +item[`price`];
    });
    return acc;
  }, 0);
};

export const setTime = (time) => time < 10 ? `0${time}` : time;

const setDaysDifference = (start, end) => `${setTime(Math.floor((end - start) / 1000 / 60 / 60 / 24))}D `;
const setHoursDifference = (start, end) => `${setTime(Math.floor((end - start) / 1000 / 60 / 60) % 24)}H `;
const setMinutesDifference = (start, end) => `${setTime(Math.floor((end - start) / 1000 / 60) % 60)}M`;

export const setTimeDifference = (start, end) => {
  let diff = ``;

  if ((end - start) / 1000 / 60 / 60 / 24 >= 1) { // сутки и больше
    diff = setDaysDifference(start, end) + setHoursDifference(start, end) + setMinutesDifference(start, end);
  } else if ((end - start) / 1000 / 60 / 60 > 1) { // больше часа
    diff = setHoursDifference(start, end) + setMinutesDifference(start, end);
  } else { // меньше часа
    diff = setMinutesDifference(start, end);
  }

  return diff;
};

export const generateOfferName = (inputText) => inputText.split(` `).join(`-`).toLowerCase();

export const generateFilterID = (inputText) => `filter-${inputText.split(` `).join(`-`).toLowerCase()}`;

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstElementChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.insertAdjacentElement(Position.AFTEREND, element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
    element.removeElement();
  }
};
