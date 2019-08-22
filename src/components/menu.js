export const getMenuComponent = (items) => `
  <nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${items[0]}</a>
    ${items.slice(1).map((item) => `<a class="trip-tabs__btn" href="#">${item}</a>`).join(``)}
  </nav>
`;
