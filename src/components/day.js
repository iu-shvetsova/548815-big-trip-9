export const getDayComponent = (number, date) => `
  <li class="trip-days__item day">
    <div class="day__info">
      <span class="day__counter">${number}</span>
      <time class="day__date" datetime="${new Date(date).toISOString().slice(0, 16)}">${new Date(date).toDateString().slice(-11, -4)}</time>
    </div>
  </li>
`;
