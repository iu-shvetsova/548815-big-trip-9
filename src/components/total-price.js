export const getTotalPriceComponent = (events) => `
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${events.reduce((acc, event) => {
    acc += event.price;
    event.options.filter((item) => item[`isChecked`]).forEach((item) => acc += item[`price`]);
    return acc;
  }, 0)}
    </span>
  </p>
`;