export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export const POINTS_AMOUNT = 5;
export const DESCRIPTION_MAX_LENGTH = 3;
export const OPTIONS_MAX_COUNT = 2;
export const PRICE_MAX = 50;
export const PHOTOS_COUNT = 5;

export const MENU_ITEMS = [`Table`, `Stats`];

export const FILTERS = [`Everything`, `Future`, `Past`];

export const CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const DESCRIPTIONS = text.split(`.`);

export const TYPES = [
  {
    name: `Bus`,
    icon: `bus.png`
  },
  {
    name: `Flight`,
    icon: `flight.png`
  },
  {
    name: `Drive`,
    icon: `drive.png`
  },
  {
    name: `Ship`,
    icon: `ship.png`
  },
  {
    name: `Taxi`,
    icon: `taxi.png`
  },
  {
    name: `Train`,
    icon: `train.png`
  },
  {
    name: `Transport`,
    icon: `transport.png`
  },
];
