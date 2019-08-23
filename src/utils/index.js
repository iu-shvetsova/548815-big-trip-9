import {Position} from './constants.js';

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
