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
