export const getDayComponent = (number, date) => `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${number}</span>
      <time class="day__date" datetime="2019-03-18">${new Date(date).toDateString().slice(-11, -4)}</time>
    </div>
  </li>
`;
