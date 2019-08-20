export const getRouteComponent = (startDate, endDate, events) => `
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${events.length > 3 ? `${events[0].city} &mdash; ... &mdash; ${events[events.length - 1].city}` : events.map((item) => item.city).join(` &mdash; `)}
    </h1>

    <p class="trip-info__dates">${new Date(startDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}&nbsp;&mdash;&nbsp;${new Date(endDate).toDateString().slice(-11, -4).split(` `).reverse().join(` `)}</p>
  </div>
`;
